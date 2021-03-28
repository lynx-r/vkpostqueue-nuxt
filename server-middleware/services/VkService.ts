import FormData from 'form-data'
import fetch from 'node-fetch'
import { VK } from 'vk-io'
import { S3Objects, UploadServerResponse } from '../model'
import {
  MESSAGE_TYPE,
  NAME_SEP,
  PHOTO_TYPE,
  VK_ATTACH_PHOTO_LIMIT,
  VK_GROUP_OWNER_ID,
  VK_MAIN_ALBUM_ID
} from './constants'
import { removeNewPrefixOfFolder } from './S3ClientService'
import { getAccessToken } from './StoreService'
import { isBucketReadyForPublish } from './utils'

const OWNER_ID = +`-${VK_GROUP_OWNER_ID}`

const getUploadUrl = async (vk: VK): Promise<string> => {
  const serverParams = {album_id: +VK_MAIN_ALBUM_ID!, group_id: +VK_GROUP_OWNER_ID!}
  const {upload_url} = await vk.api.photos.getUploadServer(serverParams)
  return upload_url
}

const uploadPhotos = async (dataEntries: [string, Buffer][], upload_url: string): Promise<UploadServerResponse> => {
  const form = new FormData()
  dataEntries
    .forEach(([name, image], i) =>
      form.append(`file${i + 1}`, image, {filename: name})
    )
  return await fetch(upload_url, {method: 'POST', body: form})
    .then(r => r.json())
}

const savePhotos = async ({hash, server, photos_list}: UploadServerResponse, vk: VK) => {
  const saveParams = {
    album_id: +VK_MAIN_ALBUM_ID!,
    group_id: +VK_GROUP_OWNER_ID!,
    hash,
    server,
    photos_list
  }
  const imageAttachments = await vk.api.photos.save(saveParams)
    .then((res) => res.map(({owner_id, id}) => `photo${owner_id}_${id}`).join(','))
  console.log('attachments created')

  return `${imageAttachments}`
}

const getMessage = (dataEntries: [string, Buffer][]) => {
  const [, msgBuffer] = dataEntries
    .find(([n]) => n.startsWith(MESSAGE_TYPE))!
  console.log('message created')
  return msgBuffer.toString()
}

const makePost = async (message: string, attachments: string | undefined, vk: VK) => {
  const wallPostParams = {owner_id: OWNER_ID, message, attachments, fromGroup: true}
  await vk.api.wall.post(wallPostParams)
  console.log('post created')
}

const getAttachment = async (vk: VK, dataEntries: [string, Buffer][]) => {
  const photos = dataEntries
    .filter(([n], i) => n.startsWith(PHOTO_TYPE) && i < VK_ATTACH_PHOTO_LIMIT)
  if (!photos.length) {
    console.log('no attachments')
    return
  }
  const upload_url = await getUploadUrl(vk)
  const uploadRes = await uploadPhotos(photos, upload_url)
  return await savePhotos(uploadRes, vk)
}

export async function postNews(news?: S3Objects) {
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
    const message = getMessage(dataEntries)
    const attachments = await getAttachment(vk, dataEntries)

    await makePost(message, attachments, vk)
    await removeNewPrefixOfFolder(folder)

    postedCount++
  }

  return postedCount
}
