import { IVKAPIConstructorProps, VKAPI } from 'vkontakte-api'
import { ACCESS_TOKEN_KEY } from '../config-constants'
import { Docs, PutToQueue, QueuePost, SaveDoc } from '../model'
import { DocsRepository } from './DocsRepository'

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

  return await api.docs.save({ accessToken, file: uploadFileString, title: fileName })
}

const putToQueue: PutToQueue = async (ctx, params) => {
  const { images, message, postOnDate, userId } = params
  const queue: Docs = []
  const msg = await saveDoc(ctx, {
    userId,
    postOnDate,
    doc: message,
    type: 'msg'
  })
  const title = message.substr(0, 500)
  queue.push({
    docInfo: msg,
    title
  })

  for (const image of images) {
    const img = await saveDoc(ctx, {
      userId,
      postOnDate,
      doc: image,
      type: 'img'
    })
    queue.push({ docInfo: img })
  }
  return queue
}

export const queuePost: QueuePost = async (ctx, params) => {
  const { $storage, $toast, $const, redirect, store } = ctx
  try {
    const queue = await putToQueue(ctx, params)
    const { postOnDate, userId } = params

    const userQueue = $storage.getLocalStorage(userId) || {}
    const userPosts = userQueue[postOnDate] || []
    if (_.isEmpty(userPosts)) {
      userQueue[postOnDate] = queue
    } else {
      userPosts.push(...queue)
    }
    $storage.setLocalStorage(userId, userQueue)
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
