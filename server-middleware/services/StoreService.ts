import { VkToken } from '../model'
import store from './store'

export const saveAccessToken = ({userId, expiresIn, accessToken}: VkToken) =>
  store.set(userId, accessToken, expiresIn)

export const getAccessToken = (userId: string): string | undefined =>
  store.get(userId)

export const getUsersTokens = (): { [key: string]: string } => {
  const userIds = store.keys()
  return store.mget(userIds)
}
