import { IncomingMessage, ServerResponse } from 'http'
import { VK } from 'vk-io'
import { PhotosSaveParams, WallPostParams } from 'vk-io/lib/api/schemas/params'
import { MiddlewareResponse, S3Objects } from './model'
import {
  createObjectKey,
  getAccessToken,
  getNewsFromS3,
  isBucketReadyForPublish,
  parseBody, signedUrlGet,
  VK_GROUP_OWNER_ID, VK_MAIN_ALBUM_ID
} from './services'
import fetch, { RequestInit } from 'node-fetch'
import FormData from 'form-data'
import { encode, decode } from 'node-base64-image'


const OWNER_ID = +`-${VK_GROUP_OWNER_ID}`

const postNews = async (news?: S3Objects) => {
  if (!news || !Object.keys(news).length) {
    return 0
  }
  const objects = Object
    .entries(news)
    .filter(([bucket]) => isBucketReadyForPublish(bucket))


  for (const [bucket, data] of objects) {
    const [_, userId] = bucket.split('__')
    const token = await getAccessToken(userId)
    if (!token) {
      continue
    }
    const vk = new VK({token})
    const dataEntries = Object.entries(data)
    const {topic, message} = dataEntries
      .filter(([n]) => n.startsWith('message_'))
      .map(([n, d]) => {
        const topic = n
          .replace('message_', '')
          .replace('.txt', '')
        const message = d.toString()
        return {topic, message}
      })[0]

    const serverParams = {album_id: +VK_MAIN_ALBUM_ID!, group_id: +VK_GROUP_OWNER_ID!}
    const {upload_url} = await vk.api.photos.getUploadServer(serverParams)

    const form = new FormData()
    dataEntries
      .filter(([n], i) => n.startsWith('image_') && i < 5)
      .forEach(([name, image], i) =>
        form.append(`file${i + 1}`, image, {filename: name})
      )
    const uploadParams: RequestInit = {method: 'POST', body: form}
    const {server, photos_list, hash} = await fetch(upload_url, uploadParams)
      .then(r => r.json())

    const saveParams: PhotosSaveParams = {
      album_id: +VK_MAIN_ALBUM_ID!,
      group_id: +VK_GROUP_OWNER_ID!,
      hash,
      server,
      photos_list
    }
    const saveRes = await vk.api.photos.save(saveParams)
    const imageAttachments = saveRes
      .map(({id, owner_id}) => `photo${owner_id}_${id}`)
    console.log(saveRes)

    // const sharedLink = await dataEntries
    //   .filter(([n]) => n.startsWith('link_'))
    //   .map(([imageName]) => `${bucket}/${imageName}`)
    //   .map(Key => signedUrlGet({Key}))[0]

    const attachments = `${imageAttachments}`
    const wallPostParams: WallPostParams = {owner_id: OWNER_ID, message, attachments, fromGroup: true}
    console.log(wallPostParams)
    const res = await vk.api.wall.post(wallPostParams)

    console.log(res)
    // console.log(data)
  }
  // console.log(token)
  //
  // console.log(VK_GROUP_OWNER_ID)
  // console.log(res)
  return 1

}

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'GET') {
    const news: S3Objects = await getNewsFromS3()
    const newsCount = Object.keys(news).length
    if (newsCount == 0) {
      return res.end(MiddlewareResponse.payloadSuccessAsString(null, 'There is no news'))
    }
    const newsPosted = postNews(news)
    const payload = {newsPosted}
    return res.end(MiddlewareResponse.payloadSuccessAsString(payload))
  }

  MiddlewareResponse.failMethodNotAllowed(res)
}
