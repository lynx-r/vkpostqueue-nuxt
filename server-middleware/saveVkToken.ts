import { IncomingMessage, ServerResponse } from 'http'
import { MiddlewareResponse, VkToken } from './model'
import { parseJson, saveAccessToken } from './services'

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'POST') {
    const accessToken: VkToken = await parseJson(req)
    saveAccessToken(accessToken)
    return res.end(MiddlewareResponse.payloadSuccessAsString())
  }

  MiddlewareResponse.failMethodNotAllowed(res)
}
