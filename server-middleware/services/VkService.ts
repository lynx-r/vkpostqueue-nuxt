import { VK } from 'vk-io'
import { CallbackService } from 'vk-io';
import { DirectAuthorization } from '@vk-io/authorization';
import {RequestOptions} from 'http'

import { VK_GROUP_OWNER_ID } from './constants'
import { S3Objects } from '../model'
import { News } from '../model/News.model'

const callbackService = new CallbackService();

const direct = new DirectAuthorization({
  callbackService,

  scope: 'wall',

  clientId: process.env.VK_CLIENT_ID!,
  clientSecret: process.env.VK_CLIENT_SECRET!,

  login: process.env.VK_USER,
  password: process.env.VK_PASSWORD,

  apiVersion: '5.130'
});

console.log(process.env.VK_USER)
const directAuthorizeVkApp = () => direct.run()

const authorizeVkApp = () => {
}

export const postNews = async (news?: S3Objects) => {
  console.log(news)

  // const auth = await authorizeVkApp()
  // console.log(auth.token)
  // const vk = new VK({
  //   token: process.env.TOKEN!
  // })
  //
  // const res = await vk.api.wall.post({ownerId: `-${VK_GROUP_OWNER_ID}`, message: 'test', fromGroup: true})
  // console.log(res)
}
