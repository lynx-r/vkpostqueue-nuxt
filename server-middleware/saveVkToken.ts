import { ServerMiddleware } from '@nuxt/types'
import { MiddlewareResponse, VkToken } from './model'
import { parseJson, saveAccessToken } from './services'

const saveVkToken: ServerMiddleware = async (req, res) => {
  if (req.method === 'POST') {
    const accessToken: VkToken = await parseJson(req)
    await saveAccessToken(accessToken)
    return res.end(MiddlewareResponse.payloadSuccessAsString())
  }

  MiddlewareResponse.failMethodNotAllowed(res)
}

export default saveVkToken
