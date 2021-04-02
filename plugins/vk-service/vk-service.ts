import { IVKAPIConstructorProps, VKAPI } from 'vkontakte-api'
import { ACCESS_TOKEN_KEY } from '../config-constants'
import { DocsStore, IDocSaveResult, QueuePost, SaveDoc } from '../model'
import { DocsRepository } from './DocsRepository'

const props: IVKAPIConstructorProps = {
  lang: 'ru',
  isBrowser: true,
  v: '5.130'
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

export const queuePost: QueuePost = async (ctx, { images, message, postOnDate, userId }) => {
  const queue: DocsStore = {}
  const msg = await saveDoc(ctx, { userId, postOnDate, doc: message, type: 'msg' })
  const title = message.substr(0, 500)
  const saved = queue[postOnDate] || []
  saved.push({ docInfo: msg, title })

  for (const image of images) {
    const img = await saveDoc(ctx, { userId, postOnDate, doc: image, type: 'img' })
    saved.push({ docInfo: img })
  }
  queue[postOnDate] = saved

  const currentQueue = ctx.$storage.getLocalStorage(postOnDate) || {}
  const newQueue = { ...currentQueue, ...queue }
  ctx.$storage.setLocalStorage(userId, newQueue)
}
