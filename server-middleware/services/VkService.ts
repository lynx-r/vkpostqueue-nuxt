import { VK } from 'vk-io'
import { CallbackService } from 'vk-io';
import { DirectAuthorization } from '@vk-io/authorization';
import {RequestOptions} from 'http'
import { getAccessToken } from './Store'

import { VK_GROUP_OWNER_ID } from './constants'
import { S3Objects } from '../model'
import { News } from '../model/News.model'

export const postNews = async (news?: S3Objects) => {
  const token = getAccessToken()
  console.log(1, token)
  if (!token) {
    return
  }

  console.log(token)
  const vk = new VK({token})

  console.log(news)
  const res = await vk.api.wall.post({ownerId: `-${VK_GROUP_OWNER_ID}`, message: 'test', fromGroup: true})
  console.log(res)
}
