import { ServerMiddleware } from '@nuxt/types'
import { MiddlewareResponse } from './model'
import { getPosts, parseJson } from './services'

const listPosts: ServerMiddleware = async (req, res) => {
  if (req.method === 'POST') {
    const { userId } = await parseJson(req)
    const posts = await getPosts(userId)
    return res.end(MiddlewareResponse.payloadSuccessAsString({ posts }))
  }
  MiddlewareResponse.failMethodNotAllowed(res)
}

export default listPosts
