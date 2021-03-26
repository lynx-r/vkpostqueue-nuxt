import { VkToken } from '../model'
// import store from './store'
import storage from 'node-persist'

(async () => {
  await storage.init()
})()
// import storage from '@nuxtjs/universal-storage'

export const saveAccessToken = ({userId, expiresIn, accessToken}: VkToken) =>
  storage.setItem(userId, accessToken)

export const getAccessToken = (userId: string): Promise<string | undefined> =>
  storage.getItem(userId)

export const getUserIds = (): Promise<string[]> => storage.keys()
