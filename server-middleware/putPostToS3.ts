import { IncomingMessage, ServerResponse } from 'http'
import { parseBody } from './_utils'
import { sendToS3 } from './_S3Client'

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'POST') {
    const body: any = await parseBody(req)
    const putRes = await sendToS3(body)
    res.end(JSON.stringify(putRes))
  } else {
    res.end('ok')
  }
}
