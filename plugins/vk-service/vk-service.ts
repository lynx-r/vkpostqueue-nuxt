import { parseISO } from 'date-fns'
import _ from 'lodash'
import { IVKAPIConstructorProps, VKAPI } from 'vkontakte-api'
import { ACCESS_TOKEN_KEY, MESSAGE_SLUG_LENGTH } from '../config-constants'
import { Doc, PostMessages, PutToQueue, QueuePost, SaveDoc, StoredDocs } from '../model'
import { DocsRepository } from './DocsRepository'
import { sortStoredDocs, storedDocsToPostMessages } from '~/plugins/utils/utils'

const props: IVKAPIConstructorProps = {
  lang: 'ru',
  isBrowser: true
}
const api = new VKAPI(props)
  .addRepository('docs', DocsRepository)

function createFile (userId: string, postOnDate: string, doc: File | string, type: 'msg' | 'img') {
  let file, fileName
  switch (type) {
    case 'img': {
      const img = doc as File
      file = new Blob([img], { type: img.type })
      fileName = `${type}.${userId}.${postOnDate}.${img.name}`
      break
    }
    case 'msg':
      file = new Blob([doc], { type: 'text/plain' })
      fileName = `${type}.${userId}.${postOnDate}.txt`
      break
  }
  return { file, fileName }
}

const saveDoc: SaveDoc = async (ctx, params) => {
  const { $storage, $config: { groupId }, $http } = ctx
  const { postOnDate, userId, doc, type } = params
  const accessToken = $storage.getCookie(ACCESS_TOKEN_KEY)
  const { uploadUrl } = await api.docs.getUploadServer({
    accessToken,
    groupId
  })

  const { file, fileName } = createFile(userId, postOnDate, doc, type)

  const formData = new FormData()
  formData.append('file', file, fileName)
  formData.append('uploadUrl', uploadUrl)

  const uploadFileString = await $http.post('/api/vk-save-doc', formData)
    .then(r => r.json())
    .then(p => p.payload.file)

  const { doc: docInfo } = await api.docs.save({ accessToken, file: uploadFileString, title: fileName })
  let msgSlug
  if (type === 'msg' && typeof doc === 'string') {
    msgSlug = doc.substring(0, MESSAGE_SLUG_LENGTH)
  }
  return { docInfo, type, msgSlug }
}

const putToQueue: PutToQueue = async (ctx, params) => {
  const { images, message, postOnDate, userId } = params
  const queue: Doc[] = []
  const msg = await saveDoc(ctx, {
    userId,
    postOnDate,
    doc: message,
    type: 'msg'
  })
  // const title = message.substr(0, 500)
  queue.push(msg)

  for (const image of images) {
    const img = await saveDoc(ctx, {
      userId,
      postOnDate,
      doc: image,
      type: 'img'
    })
    queue.push(img)
  }
  return queue
}

export const queuePost: QueuePost = async (ctx, params) => {
  const { $storage, $toast, $const, redirect, store } = ctx
  try {
    const { userId, postOnDate } = params
    const queue = await putToQueue(ctx, params)
    let userQueue: StoredDocs = $storage.getLocalStorage(userId) || {}
    const dateQueue = userQueue[postOnDate] || []
    dateQueue.push(...queue)
    userQueue[postOnDate] = dateQueue

    userQueue = sortStoredDocs(userQueue)
    $storage.setLocalStorage(userId, userQueue)

    const messages = storedDocsToPostMessages(userQueue)
    store.commit('setMessages', messages)

    $toast.success($const.NEWS_IN_QUEUE)
  } catch (e) {
    const { errorMsg, errorCode } = JSON.parse(e.message)
    if (errorCode === 5) {
      store.commit('post/resetForm')
      $toast.error($const.NEWS_QUEUE_ERROR_AUTH)
      redirect($const.AUTH_URL)
      return
    }
    $toast.error(errorMsg)
  }
}
