import NodeCache from 'node-cache'
import { VkAccessToken } from '~/server-middleware/model/VkAccessToken.model'

const store = new NodeCache()

const TOKEN_KEY = 'token'

export const saveAccessToken = ({

                                  expiresIn,
                                  accessToken
                                }: VkAccessToken) =>
  store.set(TOKEN_KEY, accessToken, expiresIn)

export const getAccessToken = (): string | undefined => store.get(TOKEN_KEY)
