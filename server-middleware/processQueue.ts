import { ServerMiddleware } from '@nuxt/types'
import { MiddlewareResponse } from './model'

const processQueue: ServerMiddleware = (req, res) => {
  if (req.method === 'GET') {
    // const news: S3Objects = await getNewsFromS3()
    // const newsCount = Object.keys(news).length
    // if (newsCount === 0) {
    //   return res.end(MiddlewareResponse.payloadSuccessAsString(null, 'There is no news'))
    // }
    // const newsPosted = await postNews(news)
    return res.end(MiddlewareResponse.payloadSuccessAsString({ msg: 'not implemented' }))
  }

  MiddlewareResponse.failMethodNotAllowed(res)
}

export default processQueue
