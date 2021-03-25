import { VK } from 'vk-io'
import { S3Objects } from '../model'

import { VK_GROUP_OWNER_ID } from './constants'
import { getAccessToken, getUsersTokens } from './StoreService'

export const postNews = async (news?: S3Objects) => {
  const token = getUsersTokens()
  console.log(1, token)
  if (!token.length) {
    return
  }

  // console.log(token)
  // const vk = new VK({token})
  //
  // console.log(VK_GROUP_OWNER_ID)
  // const res = await vk.api.wall.post({owner_id: +`-${VK_GROUP_OWNER_ID}`, message: 'test', fromGroup: true})
  // console.log(res)
}
