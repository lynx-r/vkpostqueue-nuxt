import { IncomingMessage, ServerResponse } from 'http'
import { getNewsFromS3, postNews } from './services'

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'GET') {
    const news = await getNewsFromS3()
    const newsCount = Object.keys(news).length
    if (newsCount == 0) {
      res.end({message: 'no news'})
      return
    }
    await postNews(news)
    res.end(JSON.stringify({newsCount}))
  } else {
    res.end('ok')
  }
}
