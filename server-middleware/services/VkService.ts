import { S3Objects } from '../model'

import { VK_GROUP_OWNER_ID } from './constants'
import { isBucketReadyForPublish } from '../services'

const postOneNews = (news: any) => {
  console.log(news)
}

const postNews = async (news?: S3Objects) => {
  if (!news || !Object.keys(news).length) {
    return 0
  }
  console.log(0, news)
  Object
    .entries(news)
    .filter(([bucket]) => isBucketReadyForPublish(bucket))
    .map(([bucket, data]) => {
      const [, userId] = bucket.split('__')
      // const res = await vk.api.wall.post({owner_id: +`-${VK_GROUP_OWNER_ID}`, message: 'test', fromGroup: true})

      console.log(userId)
      console.log(data)
    })

  // console.log(token)
  // const vk = new VK({token})
  //
  // console.log(VK_GROUP_OWNER_ID)
  // console.log(res)
  return 1

}
