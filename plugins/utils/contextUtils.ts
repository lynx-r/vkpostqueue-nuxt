import { Context } from '@nuxt/types'
import { formatDuration, intervalToDuration, Duration } from 'date-fns'
import { ru } from 'date-fns/locale'
import { StoredDocs } from '~/plugins/model'

const getPosts = ({ $storage }: Context, userId: number): StoredDocs =>
  $storage.getLocalStorage(userId?.toString())
const setPosts = ({ $storage }: Context, userId: number, posts: StoredDocs) =>
  $storage.setLocalStorage(userId?.toString(), posts)

const getAccessToken = ({ $storage, $const }: Context): string => $storage.getCookie($const.ACCESS_TOKEN_KEY)
const setAccessToken = ({ $storage, $const }: Context, accessToken: string, createdAt: number, expiresIn?: number) => {
  const sameSite = true
  if (!expiresIn) {
    $storage.setCookie($const.ACCESS_TOKEN_KEY, accessToken, { sameSite })
    return
  }
  const tokenCreatedAt: number = $storage.getCookie(accessToken)
  if (!tokenCreatedAt) {
    const timePassed = Math.round((new Date().getTime() - createdAt) / 1000)
    const maxAge = expiresIn - timePassed
    $storage.setCookie($const.AUTH_EXPIRES_IN_KEY, expiresIn, { maxAge, sameSite })
    $storage.setCookie(accessToken, createdAt, { maxAge, sameSite })
    const oldAccessToken = $storage.getCookie($const.ACCESS_TOKEN_KEY)
    if (oldAccessToken) {
      $storage.removeCookie(oldAccessToken)
    }
    $storage.setCookie($const.ACCESS_TOKEN_KEY, accessToken, { maxAge, sameSite })
  } else {
    const timePassed = Math.round((new Date().getTime() - tokenCreatedAt) / 1000)
    const maxAge = expiresIn - timePassed
    $storage.setCookie($const.AUTH_EXPIRES_IN_KEY, expiresIn, { maxAge, sameSite })
    $storage.setCookie($const.ACCESS_TOKEN_KEY, accessToken, { maxAge, sameSite })
  }
}

const getUserId = ({ $storage, $const }: Context): number => $storage.getCookie($const.USER_ID_KEY)
const setUserId = ({ $storage, $const }: Context, userId: number, expiresIn?: number) => {
  if (!expiresIn) {
    $storage.setCookie($const.USER_ID_KEY, userId, { sameSite: true })
    return
  }
  const accessToken = $storage.getCookie($const.ACCESS_TOKEN_KEY)
  const tokenCreatedAt: number = $storage.getCookie(accessToken)
  const timePassed = Math.round((new Date().getTime() - tokenCreatedAt) / 1000)
  const maxAge = expiresIn - timePassed
  $storage.setCookie($const.USER_ID_KEY, userId, { maxAge, sameSite: true })
}

const getExpiresTime = ({ $storage, $const }: Context): {formatted: string, duration: Duration} | null => {
  const accessToken = $storage.getCookie($const.ACCESS_TOKEN_KEY)
  if (!accessToken) {
    return { formatted: '', duration: { hours: 24, seconds: 0 } }
  }
  const tokenCreatedAt: number = $storage.getCookie(accessToken)
  if (!tokenCreatedAt) {
    return null
  }
  const expiresIn = $storage.getCookie($const.AUTH_EXPIRES_IN_KEY)
  const start = new Date().getTime()
  const end = tokenCreatedAt + expiresIn * 1000
  const duration = intervalToDuration({ start, end })
  const formatted = formatDuration(duration, { format: ['hours', 'minutes'], locale: ru })
  return { formatted, duration }
}

export const contextUtilsFactory = (ctx: Context) => ({
  getPosts: (userId: number) => getPosts(ctx, userId),
  setPosts: (userId: number, posts: StoredDocs) => setPosts(ctx, userId, posts),

  getUserPosts: () => getPosts(ctx, getUserId(ctx)),
  setUserPosts: (posts: StoredDocs) => setPosts(ctx, getUserId(ctx), posts),

  getAccessToken: () => getAccessToken(ctx),
  setAccessToken: (accessToken: string, createdAt: number, expiresIn?: number) =>
    setAccessToken(ctx, accessToken, createdAt, expiresIn),

  getUserId: () => getUserId(ctx),
  setUserId: (userId: number, expiresIn?: number) => setUserId(ctx, userId, expiresIn),
  getExpiresTime: () => getExpiresTime(ctx)
})
