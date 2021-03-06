import { NuxtHTTPInstance } from '@nuxt/http'
import { Context } from '@nuxt/types'
import { addMinutes, isWithinInterval, parseISO, subMinutes } from 'date-fns'
import _ from 'lodash'
import { IVKAPIConstructorProps, VKAPI } from 'vkontakte-api'
import { MESSAGE_SLUG_LENGTH } from '../config-constants'
import {
  DocInfo,
  DocType,
  Image,
  Message,
  RemovePostParams,
  SaveDocParams,
  SavePostParams,
  StoredDocs,
  VkDownloadDocRequest
} from '../model'
import { docTitleToName, formatDate, formatTime, sortStoredDocs, storedDocsToPostMessages } from '../utils/utils'
import { DocsRepository } from './DocsRepository'
import { PhotosRepository } from './PhotosRepository'
import { WallRepository } from './WallRepository'

const props: IVKAPIConstructorProps = {
  lang: 'ru',
  isBrowser: true
}

const api = new VKAPI(props)
  .addRepository('docs', DocsRepository)
  .addRepository('wall', WallRepository)
  .addRepository('photos', PhotosRepository)

function createFile (userId: number, postOnDate: string, doc: File | string, type: DocType) {
  let file, fileName
  switch (type) {
    case 'img': {
      const img = doc as File
      file = new Blob([img], { type: img.type })
      fileName = `${type}.${userId}.${postOnDate}_${img.name}`
      break
    }
    case 'msg':
      file = new Blob([doc], { type: 'text/plain' })
      fileName = `${type}.${userId}_${postOnDate}.txt`
      break
  }
  return { file, fileName }
}

const saveDoc = async (ctx: Context, params: SaveDocParams): Promise<DocInfo> => {
  const { $ctxUtils, $config: { groupId }, $http } = ctx
  const { postOnDate, doc, type } = params
  const accessToken = $ctxUtils.getAccessToken()
  const { uploadUrl } = await api.docs.getUploadServer({
    accessToken,
    groupId
  })

  const userId = $ctxUtils.getUserId()
  const { file, fileName } = createFile(userId, postOnDate, doc, type)

  const formData = new FormData()
  formData.append('file', file, fileName)
  formData.append('uploadUrl', uploadUrl)

  const uploadFileString = await $http.post('/api/vk-save-doc', formData)
    .then(r => r.json())
    .then(p => p.payload.file)

  const { doc: docInfo } = await api.docs.save({
    accessToken,
    file: uploadFileString,
    title: fileName
  })
  return docInfo
}

const putToQueue = async (ctx: Context, params: SavePostParams) => {
  const { images, text, postOnDate } = params
  const queue: Message[] = []
  const textDoc = _.trim(text)
  const savedText = await saveDoc(ctx, {
    postOnDate,
    doc: textDoc,
    type: 'msg'
  })
  const slug = textDoc.substring(0, MESSAGE_SLUG_LENGTH)
  const message: Message = {
    text: {
      id: savedText.id,
      doc: savedText,
      slug
    },
    images: []
  }

  for (const image of images) {
    const img = await saveDoc(ctx, {
      postOnDate,
      doc: image,
      type: 'img'
    })
    message.images.push({
      id: img.id,
      doc: img
    })
  }

  queue.push(message)
  return queue
}

async function queuePost (ctx: Context, params: SavePostParams) {
  const { $toast, $const, $ctxUtils, redirect, store } = ctx
  try {
    const { postOnDate, silent = false } = params
    const queue = await putToQueue(ctx, params)
    let userQueue: StoredDocs = $ctxUtils.getUserPosts() || {}
    const dateQueue = userQueue[postOnDate] || []
    dateQueue.push(...queue)
    userQueue[postOnDate] = dateQueue

    userQueue = sortStoredDocs(userQueue)
    $ctxUtils.setUserPosts(userQueue)

    const messages = storedDocsToPostMessages(userQueue)
    store.commit('setMessages', messages)

    !silent && $toast.success($const.NEWS_IN_QUEUE)
  } catch (e) {
    console.log(e)
    const { errorMsg, errorCode } = JSON.parse(e.message)
    if (errorCode === 5) {
      $toast.error($const.NEWS_QUEUE_ERROR_AUTH)
      redirect($const.AUTH_URL)
      return
    }
    $toast.error(errorMsg)
  } finally {
    store.commit('post/resetForm')
  }
}

async function getTextFile (url: string, $http: NuxtHTTPInstance) {
  const body: VkDownloadDocRequest = {
    url,
    type: 'msg'
  }
  return await $http.post('/api/vk-download-doc', body)
    .then(r => r.json())
    .then(({ payload }) => payload)
}

async function getImageFile (image: Image, $http: NuxtHTTPInstance) {
  const body: VkDownloadDocRequest = {
    url: image.doc.url,
    type: 'img'
  }
  const img = await $http.post('/api/vk-download-doc', body)
    .then(r => r.body)
  if (!img) {
    return
  }
  const reader = img.getReader()
  const imgArr = []
  while (true) {
    const {
      done,
      value
    } = await reader.read()
    if (done) {
      if (value) {
        imgArr.push(value)
      }
      break
    }
    if (value) {
      imgArr.push(value)
    }
  }
  reader.releaseLock()
  const name = docTitleToName(image.doc.title)
  return new File(imgArr, name)
}

async function getImageFiles (images: Image[], $http: NuxtHTTPInstance) {
  const imageFiles = []
  for (const image of images) {
    const file = await getImageFile(image, $http)
    imageFiles.push(file)
  }
  return imageFiles
}

async function getAttachments (images: Image[], ctx: Context): Promise<string> {
  const { $http, $ctxUtils, $config } = ctx

  const accessToken = $ctxUtils.getAccessToken()
  const groupId = $config.groupId
  const { uploadUrl, userId } = await api.photos.getWallUploadServer({
    accessToken,
    groupId
  })

  const attachments = []
  for (const image of images) {
    const file = await getImageFile(image, $http)
    if (!file) {
      continue
    }
    const formData = new FormData()
    const fileName = docTitleToName(image.doc.title)
    formData.append('photo', file, fileName)
    formData.append('uploadUrl', uploadUrl)

    const { server, photo, hash } = await $http.post('/api/vk-save-doc', formData)
      .then(r => r.json())
      .then(p => p.payload)
    const a = await api.photos.saveWallPhoto({
      accessToken,
      groupId,
      hash,
      photo,
      userId,
      server,
      caption: fileName
    })
    const { id: mediaId, ownerId } = a[0]
    const attachPhoto = `photo${ownerId}_${mediaId}`
    attachments.push(attachPhoto)
  }
  return attachments.join(',')
}

async function getPost (ctx: Context, messageId: number) {
  const { $http, $toast, $ctxUtils, $const, store } = ctx
  const docs: StoredDocs = $ctxUtils.getUserPosts()
  if (_.isEmpty(docs)) {
    return
  }

  const post = Object.entries(docs)
    .map(([postOnDate, posts]) => {
      const doc = posts.find(p => p.text.id === messageId)
      if (!doc) {
        return undefined
      }
      return { postOnDate, doc }
    })
    .find(d => !!d)
  if (!post) {
    $toast.info($const.NEWS_NOT_FOUND)
    return
  }

  const { postOnDate, doc } = post

  const dateParsed = parseISO(postOnDate)
  const date = formatDate(dateParsed)
  const time = formatTime(dateParsed)
  const text = await getTextFile(doc.text.doc.url, $http)
  const images = await getImageFiles(doc.images, $http)

  store.commit('post/setPost', { text, date, time, images })
  store.commit('setEditMessage', messageId)
}

async function removePost (ctx: Context, params: RemovePostParams) {
  const { $toast, $ctxUtils, $const, $config, store } = ctx
  const { messageId, silent = false } = params
  const docs: StoredDocs = $ctxUtils.getUserPosts()
  if (_.isEmpty(docs)) {
    return
  }

  const doc = Object.values(docs)
    .map(posts => posts.find(p => p.text.id === messageId))
    .find(d => !!d)
  if (!doc) {
    $toast.info($const.NEWS_NOT_FOUND)
    return
  }
  const accessToken = $ctxUtils.getAccessToken()
  const ownerId = -$config.groupId
  await api.docs.delete({ accessToken, ownerId, docId: messageId })
  const imagesIds = doc.images.map(i => i.id)
  for (const imgId of imagesIds) {
    await api.docs.delete({ accessToken, ownerId, docId: imgId })
  }

  const entries = Object.entries(docs)
    .map(([postOnDate, posts]) => {
      const filtered = posts.filter(p => p.text.id !== messageId)
      if (_.isEmpty(filtered)) {
        return null
      }
      return [postOnDate, filtered]
    })
    .filter(p => !!p)
    .map(p => p!)
  const newPosts = Object
    .fromEntries(entries)
  $ctxUtils.setUserPosts(newPosts)

  const messages = storedDocsToPostMessages(newPosts)
  store.commit('setMessages', messages)
  !silent && $toast.success($const.NEWS_QUEUE_REMOVED)
}

const processQueue = async (ctx: Context) => {
  console.log('start processing queue')
  const { $ctxUtils, $http, $config } = ctx
  const posts = $ctxUtils.getUserPosts()
  const docs = _.entries(posts)
    .filter(([postOnDate]) => {
      const interval = {
        start: subMinutes(new Date(), $config.checkPostIntervalMin - 1),
        end: addMinutes(new Date(), $config.checkPostIntervalMin - 1)
      }
      const date = parseISO(postOnDate)
      return isWithinInterval(date, interval)
    })
    .flatMap(([, docs]) => docs)

  const ownerId = -$config.groupId
  const accessToken = $ctxUtils.getAccessToken()
  for (const doc of docs) {
    const message = await getTextFile(doc.text.doc.url, $http)
    const attachments = await getAttachments(doc.images, ctx)
    const wallPostParams = { accessToken, ownerId, message, attachments, fromGroup: true }
    await api.wall.post(wallPostParams)
  }
  console.log('queue processed')
}

export const vkServiceFactory = (ctx: Context) => ({
  queuePost: (params: SavePostParams) => queuePost(ctx, params),
  processQueue: () => processQueue(ctx),
  getPost: (messageId: number) => getPost(ctx, messageId),
  removePost: (params: RemovePostParams) => removePost(ctx, params)
})
