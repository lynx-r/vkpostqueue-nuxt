import { Context } from '@nuxt/types'
import { IVKAPIConstructorProps, VKAPI } from 'vkontakte-api'
import { DocsRepository } from './DocsRepository'
// import { ACCESS_TOKEN_KEY } from '~/plugins/constants'

const props: IVKAPIConstructorProps = {
  // rps: 20,
  lang: 'ru',
  isBrowser: true,
  v: '5.130'
}
const api = new VKAPI(props)
  .addRepository('docs', DocsRepository)

export const saveMessage = async (ctx: Context/*, message: string */) => {
  const accessToken = ctx.$storage.getCookie(ctx.$const.ACCESS_TOKEN_KEY)
  // console.log(accessToken, ctx.$config.groupId)
  // console.log(api.docs.getUploadServer)
  await api.users.get({ accessToken, userIds: [222] })
  // console.log(r)
  // const url = await api.docs.getUploadServer({
  //   accessToken,
  //   groupId: ctx.$config.groupId
  // })
  //   .then(r => console.log(r))
  //   .catch(r => console.log(r))
  // await new Promise((resolve) => {
  //   setTimeout(() => resolve(1), 1000)
  // })
  // console.log('!!!')
  // console.log(url)
  // console.log(message)
  return 1
}
