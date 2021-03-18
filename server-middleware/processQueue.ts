import { IncomingMessage, ServerResponse } from 'http'
import { getNewsFromS3 } from './services/S3ClientService'

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'GET') {
    const news = await getNewsFromS3()
    res.end(JSON.stringify({countNews: news.length}))
  } else {
    res.end('ok')
  }
}
