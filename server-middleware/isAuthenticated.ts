import { ServerMiddleware } from '@nuxt/types'
import { MiddlewareResponse } from './model';
import { getAccessToken, parseJson } from './services';

const isAuthenticated: ServerMiddleware = async (req, res) => {
  const user: {userId?: string} = await parseJson(req)
  const isAuthenticated = user?.userId && await getAccessToken(user.userId.toString())
  res.end(MiddlewareResponse.payloadSuccessAsString({isAuthenticated}))
}
export default isAuthenticated
