import { Context } from '@nuxt/types'
import { StoredDocs } from '~/plugins/model'

const getPosts = ({ $storage }: Context, userId: string) =>
  $storage.getLocalStorage(userId)
const setPosts = ({ $storage }: Context, userId: string, posts: StoredDocs) =>
  $storage.setLocalStorage(userId, posts)

const getUserId = ({ $storage, $const }: Context) => $storage.getCookie($const.USER_ID_KEY)
const setUserId = ({ $storage, $const }: Context, userId: string) =>
  $storage.setCookie($const.USER_ID_KEY, userId)

const getAccessToken = ({ $storage, $const }: Context) => $storage.getCookie($const.ACCESS_TOKEN_KEY)
const setAccessToken = ({ $storage, $const }: Context, accessToken: string) =>
  $storage.setCookie($const.ACCESS_TOKEN_KEY, accessToken)

const getAuthExpiresIn = ({ $storage, $const }: Context) => $storage.getCookie($const.AUTH_EXPIRES_IN_KEY)
const setAuthExpiresIn = ({ $storage, $const }: Context, expiresIn: number) =>
  $storage.setCookie($const.AUTH_EXPIRES_IN_KEY, expiresIn)

export const contextUtilsFactory = (ctx: Context) => ({
  getPosts: (userId: string) => getPosts(ctx, userId),
  setPosts: (userId: string, posts: StoredDocs) => setPosts(ctx, userId, posts),

  getUserPosts: () => getPosts(ctx, getUserId(ctx)),
  setUserPosts: (posts: StoredDocs) => setPosts(ctx, getUserId(ctx), posts),

  getUserId: () => getUserId(ctx),
  setUserId: (userId: string) => setUserId(ctx, userId),

  getAccessToken: () => getAccessToken(ctx),
  setAccessToken: (accessToken: string) => setAccessToken(ctx, accessToken),

  getAuthExpiresIn: () => getAuthExpiresIn(ctx),
  setAuthExpiresIn: (expiresIn: number) => setAuthExpiresIn(ctx, expiresIn)
})
