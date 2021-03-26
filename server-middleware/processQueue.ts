import { IncomingMessage, ServerResponse } from 'http'
import { MiddlewareResponse, S3Objects } from './model'
import { getNewsFromS3, postNews } from './services'

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'GET') {
    const news: S3Objects = await getNewsFromS3()
    const newsCount = Object.keys(news).length
    if (newsCount == 0) {
      return res.end(MiddlewareResponse.payloadSuccessAsString(null, 'There is no news'))
    }
    const newsPosted = await postNews(news)
    const payload = {newsPosted}
    return res.end(MiddlewareResponse.payloadSuccessAsString(payload))
  }

  MiddlewareResponse.failMethodNotAllowed(res)
}
