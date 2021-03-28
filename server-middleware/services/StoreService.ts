import storage from 'node-persist'
import { VkToken } from '../model'
import { PREVIEW_POST_LENGTH } from './constants'

(async () => {
  await storage.init()
})()

const storagePostKey = (userId: string | number) => `post__${userId}`
const storageAccessTokenKey = (userId: string | number) => `access_token__${userId}`

export const saveAccessToken = ({userId, accessToken}: VkToken) =>
  storage.setItem(storageAccessTokenKey(userId), accessToken)

export const getAccessToken = (userId: string): Promise<string | undefined> =>
  storage.getItem(storageAccessTokenKey(userId))

export const getUserIds = (): Promise<string[]> => storage.keys()

export const getPosts = async (userId: string) => storage.getItem(storagePostKey(userId))

export const savePost = async (userId: string, postOnDate: string, body: string) => {
  const key = storagePostKey(userId)
  const userPosts = await storage.getItem(key) ?? []
  const preview = body.substring(0, PREVIEW_POST_LENGTH)
  const post = {
    postOnDate,
    preview
  }
  userPosts.push(post)
  await storage.setItem(key, userPosts)
}
