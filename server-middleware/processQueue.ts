import FormData from 'form-data'
import { IncomingMessage, ServerResponse } from 'http'
import fetch from 'node-fetch'
import { VK } from 'vk-io'
import { MiddlewareResponse, S3Objects, UploadServerResponse } from './model'
import {
  getAccessToken,
  getNewsFromS3,
  isBucketReadyForPublish,
  MESSAGE_TYPE,
  NAME_SEP,
  PHOTO_TYPE, removeNewPrefixOfFolder,
  VK_ATTACH_PHOTO_LIMIT,
  VK_GROUP_OWNER_ID,
  VK_MAIN_ALBUM_ID
} from './services'


const OWNER_ID = +`-${VK_GROUP_OWNER_ID}`

async function getUploadUrl(vk: VK): Promise<string> {
  const serverParams = {album_id: +VK_MAIN_ALBUM_ID!, group_id: +VK_GROUP_OWNER_ID!}
  const {upload_url} = await vk.api.photos.getUploadServer(serverParams)
  return upload_url
}

async function uploadPhotos(dataEntries: [string, Buffer][], upload_url: string): Promise<UploadServerResponse> {
  const form = new FormData()
  dataEntries
    .filter(([n], i) => n.startsWith(PHOTO_TYPE) && i < VK_ATTACH_PHOTO_LIMIT)
    .forEach(([name, image], i) =>
      form.append(`file${i + 1}`, image, {filename: name})
    )
  const uploadParams = {method: 'POST', body: form}

  return await fetch(upload_url, uploadParams)
    .then(r => r.json())
}

async function savePhotos({hash, server, photos_list}: UploadServerResponse, vk: VK) {
  const saveParams = {
    album_id: +VK_MAIN_ALBUM_ID!,
    group_id: +VK_GROUP_OWNER_ID!,
    hash,
    server,
    photos_list
  }
  const saveRes = await vk.api.photos.save(saveParams)
  const imageAttachments = saveRes
    .map(({id, owner_id}) => `photo${owner_id}_${id}`)

  return `${imageAttachments}`
}

function getMessage(dataEntries: [string, Buffer][]) {
  const [, msgBuffer] = dataEntries
    .find(([n]) => n.startsWith(MESSAGE_TYPE))!
  return msgBuffer.toString()
}

async function makePost(message: string, attachments: string, vk: VK) {
  const wallPostParams = {owner_id: OWNER_ID, message, attachments, fromGroup: true}
  const res = await vk.api.wall.post(wallPostParams)
  console.log(res)
}

async function postNews(news?: S3Objects) {
  if (!news || !Object.keys(news).length) {
    return 0
  }
  const objects = Object
    .entries(news)
    .filter(([bucket]) => isBucketReadyForPublish(bucket))

  let postedCount = 0
  for (const [folder, data] of objects) {
    const [, userId] = folder.split(NAME_SEP)
    const token = await getAccessToken(userId)
    if (!token) {
      continue
    }

    const vk = new VK({token})
    const dataEntries = Object.entries(data)

    const upload_url = await getUploadUrl(vk)
    const uploadRes = await uploadPhotos(dataEntries, upload_url)
    const attachments = await savePhotos(uploadRes, vk)
    const message = getMessage(dataEntries)

    await makePost(message, attachments, vk)

    await removeNewPrefixOfFolder(folder)

    postedCount++
  }

  return postedCount

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
