import { IncomingMessage, ServerResponse } from 'http'
import { VkToken } from './model'
import { parseJson, saveAccessToken } from './services'

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'POST') {
    const accessToken: VkToken = await parseJson(req)
    saveAccessToken(accessToken)
    res.end(JSON.stringify({status: 'ok'}))
  } else {
    res.end(JSON.stringify({status: 'fail'}))
  }
}
