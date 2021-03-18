import { IncomingMessage, ServerResponse } from 'http'
import { News } from '~/server-middleware/model/News.model'
import { NEW_BUCKET_PREFIX, parseJson, sendToS3 } from './services'

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'POST') {
    const {postOnDate, news: Body, topic, photoUrls}: News = await parseJson(req)
    const Key = `${NEW_BUCKET_PREFIX}_${postOnDate}/message_${topic}.txt`
    const putRes = await sendToS3({Body, Key})
    res.end(JSON.stringify(putRes))
  } else {
    res.end('ok')
  }
}
