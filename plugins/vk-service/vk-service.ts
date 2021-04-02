import { Context } from '@nuxt/types'
import { IVKAPIConstructorProps, VKAPI } from 'vkontakte-api'
import { ACCESS_TOKEN_KEY } from '../config-constants'
import { QueuePost, SaveMessage, VkWallPostParams } from '../model'
import { DocsRepository } from './DocsRepository'

const props: IVKAPIConstructorProps = {
  lang: 'ru',
  isBrowser: true,
  v: '5.130'
}
const api = new VKAPI(props)
  .addRepository('docs', DocsRepository)

const saveMessage: SaveMessage = async (ctx, params) => {
  const { $storage, $config, $http } = ctx
  const { postOnDate, userId, message } = params

  const accessToken = $storage.getCookie(ACCESS_TOKEN_KEY)
  const { uploadUrl } = await api.docs.getUploadServer({
    accessToken,
    groupId: $config.groupId
  })

  const file = new Blob([message], { type: 'text/plain' })
  const formData = new FormData()
  const fileName = `message.${userId}.${postOnDate}.txt`
  formData.append('file', file, fileName)
  formData.append('uploadUrl', uploadUrl)
  const docs = await $http.post('/api/vk-save-docs', formData)
    .then(r => r.json())
    .then(p => p.payload)
  console.log(docs)
}

export const queuePost: QueuePost = async (ctx, { images, message, postOnDate, userId }) => {
  await saveMessage(ctx, {
    message,
    postOnDate,
    userId
  })
}
