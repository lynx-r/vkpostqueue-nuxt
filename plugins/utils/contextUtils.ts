import { Context } from '@nuxt/types'

const getUserId = ({ $storage, $const }: Context) => $storage.getUniversal($const.USER_ID_KEY)
const getAccessToken = ({ $storage, $const }: Context) => $storage.getUniversal($const.ACCESS_TOKEN_KEY)
const getAuthExpiresIn = ({ $storage, $const }: Context) => $storage.getUniversal($const.AUTH_EXPIRES_IN_KEY)

const setUserId = ({ $storage, $const }: Context, userId: string) =>
  $storage.setUniversal($const.USER_ID_KEY, userId)
const setAccessToken = ({ $storage, $const }: Context, accessToken: string) =>
  $storage.setUniversal($const.ACCESS_TOKEN_KEY, accessToken)
const setAuthExpiresIn = ({ $storage, $const }: Context, expiresIn: number) =>
  $storage.setUniversal($const.AUTH_EXPIRES_IN_KEY, expiresIn)

export const contextUtilsFactory = (ctx: Context) => ({
  getUserId: () => getUserId(ctx),
  getAccessToken: () => getAccessToken(ctx),
  getAuthExpiresIn: () => getAuthExpiresIn(ctx),

  setUserId: (userId: string) => setUserId(ctx, userId),
  setAccessToken: (accessToken: string) => setAccessToken(ctx, accessToken),
  setAuthExpiresIn: (expiresIn: number) => setAuthExpiresIn(ctx, expiresIn)
})
