import { ServerMiddleware } from '@nuxt/types'
import { MiddlewareResponse } from './model'

const listPosts: ServerMiddleware = (req, res) => {
  if (req.method === 'POST') {
    return res.end(MiddlewareResponse.payloadSuccessAsString({ msg: 'not implemented' }))
  }
  MiddlewareResponse.failMethodNotAllowed(res)
}

export default listPosts
