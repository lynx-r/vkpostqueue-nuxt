import { VKAPI } from "vkontakte-api"
import { VK_GROUP_OWNER_ID } from './constants'
import { S3Objects } from '../model'
import { News } from '../model/News.model'

const vkApi = new VKAPI({
  accessToken: process.env.ACCESS_TOKEN_TMP
})

export const postNews = async (news?: S3Objects) => {
  console.log(news)
  const res = await vkApi.wall.post({ownerId: `-${VK_GROUP_OWNER_ID}`, message: 'test', fromGroup: true})
  console.log(res)
}
