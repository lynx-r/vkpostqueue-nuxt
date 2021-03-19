import store from './store'
import { VkToken } from '../model'

const TOKEN_KEY = 'token'

export const saveAccessToken = ({
                                  expiresIn,
                                  accessToken
                                }: VkToken) =>
  store.set(TOKEN_KEY, accessToken, expiresIn)

export const getAccessToken = (): string | undefined => store.get(TOKEN_KEY)
