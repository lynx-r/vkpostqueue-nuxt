import { Context } from '@nuxt/types'
import { StoredDocs } from '~/plugins/model'

const getPosts = ({ $storage }: Context, userId: number): StoredDocs =>
  $storage.getLocalStorage(userId?.toString())
const setPosts = ({ $storage }: Context, userId: number, posts: StoredDocs) =>
  $storage.setLocalStorage(userId?.toString(), posts)

const getAccessToken = ({ $storage, $const }: Context): string => $storage.getCookie($const.ACCESS_TOKEN_KEY)
const setAccessToken = ({ $storage, $const }: Context, accessToken: string, createdAt: number, expiresIn: number) => {
  const tokenCreatedAt: number = $storage.getCookie(accessToken)
  const sameSite = true
  if (!tokenCreatedAt) {
    const timePassed = Math.round((new Date().getTime() - createdAt) / 1000)
    const maxAge = expiresIn - timePassed
    $storage.setCookie(accessToken, createdAt, { maxAge, sameSite })
    const oldAccessToken = $storage.getCookie($const.ACCESS_TOKEN_KEY)
    if (oldAccessToken) {
      $storage.removeCookie(oldAccessToken)
    }
    $storage.setCookie($const.ACCESS_TOKEN_KEY, accessToken, { maxAge, sameSite })
  } else {
    const timePassed = Math.round((new Date().getTime() - tokenCreatedAt) / 1000)
    const maxAge = expiresIn - timePassed
    $storage.setCookie($const.ACCESS_TOKEN_KEY, accessToken, { maxAge, sameSite })
  }
}

const getUserId = ({ $storage, $const }: Context): number => $storage.getCookie($const.USER_ID_KEY)
/**
 * MUST BE CALLED AFTER setAccessToken
 * @param $storage
 * @param $const
 * @param userId
 * @param expiresIn
 */
const setUserId = ({ $storage, $const }: Context, userId: number, expiresIn: number) => {
  const accessToken = $storage.getCookie($const.ACCESS_TOKEN_KEY)
  const tokenCreatedAt: number = $storage.getCookie(accessToken)
  const timePassed = (new Date().getTime() - tokenCreatedAt) / 1000
  const maxAge = expiresIn - timePassed
  $storage.setCookie($const.USER_ID_KEY, userId, { maxAge, sameSite: true })
}

export const contextUtilsFactory = (ctx: Context) => ({
  getPosts: (userId: number) => getPosts(ctx, userId),
  setPosts: (userId: number, posts: StoredDocs) => setPosts(ctx, userId, posts),

  getUserPosts: () => getPosts(ctx, getUserId(ctx)),
  setUserPosts: (posts: StoredDocs) => setPosts(ctx, getUserId(ctx), posts),

  getAccessToken: () => getAccessToken(ctx),
  setAccessToken: (accessToken: string, createdAt: number, expiresIn: number) =>
    setAccessToken(ctx, accessToken, createdAt, expiresIn),

  getUserId: () => getUserId(ctx),
  setUserId: (userId: number, expiresIn: number) => setUserId(ctx, userId, expiresIn)
})
