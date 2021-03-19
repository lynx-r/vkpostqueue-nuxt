import { IncomingMessage, ServerResponse } from 'http'
import { S3Objects } from '~/server-middleware/model'
import { getAccessToken, getNewsFromS3, postNews } from './services'

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'GET') {
    const news: S3Objects = {}//await getNewsFromS3()
    const newsCount = Object.keys(news).length
    if (newsCount == 0) {
      // res.end({message: 'no news'})
      // return
    }
    await postNews(news)
    res.end(JSON.stringify({newsCount}))
  } else {
    res.end('ok')
  }
}
