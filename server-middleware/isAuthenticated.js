import { MiddlewareResponse } from './model';
import { getAccessToken, parseJson } from './services';

export default async (req, res) => {
  const user = await parseJson(req)
  const isAuthenticated = user?.userId && getAccessToken(user.userId)
  res.end(MiddlewareResponse.payloadSuccessAsString({isAuthenticated}))
}
