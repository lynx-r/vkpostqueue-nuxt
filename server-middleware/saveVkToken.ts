import { IncomingMessage, ServerResponse } from 'http'
import { getAccessToken, parseJson, saveAccessToken } from './services'
import { VkToken } from './model'

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'POST') {
    const accessToken: VkToken = await parseJson(req)
    saveAccessToken(accessToken)
    res.end(JSON.stringify({status: 'ok'}))
  } else {
    res.end(JSON.stringify({status: 'fail'}))
  }
}
