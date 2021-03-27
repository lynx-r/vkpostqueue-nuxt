import { IncomingMessage, ServerResponse } from 'http'
import { MiddlewareResponse } from './model'
import { listPosts, parseJson } from './services'

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'POST') {
    const {userId} = await parseJson(req)
    const posts = await listPosts(userId)
    return res.end(MiddlewareResponse.payloadSuccessAsString({posts}))
  }
  MiddlewareResponse.failMethodNotAllowed(res)
}
