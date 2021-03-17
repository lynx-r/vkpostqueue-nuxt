import aws from 'aws-sdk'
import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3'
import { IncomingMessage, ServerResponse } from 'http'

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_MYAPP,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_MYAPP,
  region: process.env.AWS_REGION_MYAPP,
})

const S3_BUCKET = process.env.AWS_BUCKET_NAME

const s3 = new aws.S3()

const parseBody = <T>(req: IncomingMessage): Promise<T> => new Promise<string>(
  (resolve) => {
    const requestBody: Uint8Array[] = []
    req.on('data', chunk => requestBody.push(chunk))
    req.on('end', () => resolve(Buffer.concat(requestBody).toString()))
  })
  .then(body => JSON.parse(body))

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'POST') {
    // const body: PutObjectCommandInput = await parseBody(req)
    // const putParams = {...body, Bucket: S3_BUCKET}
    // const putRes = await s3.send(new PutObjectCommand(putParams))
    res.end(JSON.stringify({data: 'hi'}))
  } else {
    res.end('ok')
  }
}
