import { Context } from '@nuxt/types'
import { IVKAPIConstructorProps, VKAPI } from 'vkontakte-api'
import { ACCESS_TOKEN_KEY } from '../config-constants'
import { DocsRepository } from './DocsRepository'

const props: IVKAPIConstructorProps = {
  // rps: 20,
  lang: 'ru',
  isBrowser: true,
  v: '5.130'
}
const api = new VKAPI(props)
  .addRepository('docs', DocsRepository)

export const saveMessage = ({ $storage, $http, $config }: Context, message: string) => {
  // const accessToken = $storage.getCookie(ACCESS_TOKEN_KEY)
  // console.log(await api.users.get({ accessToken, userIds: [1111] }))
  // const { uploadUrl } = await api.docs.getUploadServer({
  //   accessToken,
  //   groupId: $config.groupId
  // })

  const uploadUrl = 'uplUrl'
  const file = new Blob([message], { type: 'text/plain' })
  const formData = new FormData()
  formData.append('file', file, 'message123123.txt')
  formData.append('uploadUrl', uploadUrl)
  return $http.post('/api/vk-save-docs', formData)
}
