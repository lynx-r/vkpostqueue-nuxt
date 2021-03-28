import { ServerMiddleware } from '@nuxt/types'
import fetch from 'node-fetch'
import { saveAccessToken, VK_AUTH_ERROR_REDIRECT, VK_AUTH_SUCCESS_REDIRECT, VK_GET_ACCESS_TOKEN_URL } from './services'

/**
 * @deprecated
 * Из-за того, что Вк можно выполнить метод wall.post только с токеном полученным через Implicit Wall,
 * этот метод становистя не пригодным для поставленной задачи: автоматического постинга на стену сообщества
 *
 * FIXME причесать если будет нужен
 * @param req
 * @param res
 */
const vkAuthorizationCodeFlowCallback: ServerMiddleware = async (req, res) => {
  const codeMatch = req.url?.match(/code=(\w+)/)
  if (!codeMatch?.length) {
    res.end({ message: 'Unable to get "authorization code"' })
    return
  }
  const code = codeMatch[1]
  const requestAccessTokenUrl = VK_GET_ACCESS_TOKEN_URL + `&code=${code}`
  const token = await fetch(requestAccessTokenUrl)
    .then(r => r.json())
  if (token?.error) {
    res.writeHead(302, { Location: VK_AUTH_ERROR_REDIRECT })
    res.end()
    return
  }
  const accessToken = { accessToken: token.access_token, expiresIn: token.expires_in, userId: token.user_id }
  await saveAccessToken(accessToken)
  res.writeHead(302, { Location: VK_AUTH_SUCCESS_REDIRECT })
  res.end()
}

export default vkAuthorizationCodeFlowCallback
