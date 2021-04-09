import { Context } from '@nuxt/types'
import _ from 'lodash'
import { IVKAPIConstructorProps, VKAPI } from 'vkontakte-api'
import { ACCESS_TOKEN_KEY, MESSAGE_SLUG_LENGTH } from '../config-constants'
import { DocInfo, DocType, Message, SaveDocParams, SavePostParams, StoredDocs } from '../model'
import { sortStoredDocs, storedDocsToPostMessages } from '../utils/utils'
import { DocsRepository } from './DocsRepository'

const props: IVKAPIConstructorProps = {
  lang: 'ru',
  isBrowser: true
}

const api = new VKAPI(props)
  .addRepository('docs', DocsRepository)

function createFile (userId: string, postOnDate: string, doc: File | string, type: DocType) {
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

const saveDoc = async (ctx: Context, params: SaveDocParams): Promise<DocInfo> => {
  const { $ctxUtils, $config: { groupId }, $http } = ctx
  const { postOnDate, userId, doc, type } = params
  const accessToken = $ctxUtils.getAccessToken()
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

  const { doc: docInfo } = await api.docs.save({
    accessToken,
    file: uploadFileString,
    title: fileName
  })
  return docInfo
}

const putToQueue = async (ctx: Context, params: SavePostParams) => {
  const { images, text, postOnDate, userId } = params
  const queue: Message[] = []
  const textDoc = _.trim(text)
  const savedText = await saveDoc(ctx, {
    userId,
    postOnDate,
    doc: textDoc,
    type: 'msg'
  })
  const slug = textDoc.substring(0, MESSAGE_SLUG_LENGTH)
  const message: Message = {
    text: {
      id: savedText.id.toString(),
      doc: savedText,
      slug
    },
    images: []
  }

  for (const image of images) {
    const img = await saveDoc(ctx, {
      userId,
      postOnDate,
      doc: image,
      type: 'img'
    })
    message.images.push({
      id: img.id.toString(),
      doc: img
    })
  }

  queue.push(message)
  return queue
}

async function queuePost (ctx: Context, params: SavePostParams) {
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
      $toast.error($const.NEWS_QUEUE_ERROR_AUTH)
      redirect($const.AUTH_URL)
      return
    }
    $toast.error(errorMsg)
  } finally {
    store.commit('post/resetForm')
  }
}

const removePost = (ctx: Context, messageId: string) => {
  console.log(messageId)
  const { $storage, $ctxUtils } = ctx
  const userId = $ctxUtils.getUserId()
  console.log(userId)
  const docs: StoredDocs = $storage.getLocalStorage(userId)
  console.log(docs)
  if (_.isEmpty(docs)) {
    return
  }

  window.d = docs
  console.log(docs)
}

export const vkServiceFactory = (ctx: Context) => ({
  queuePost: (params: SavePostParams) => queuePost(ctx, params),
  removePost: (messageId: string) => removePost(ctx, messageId)
})
