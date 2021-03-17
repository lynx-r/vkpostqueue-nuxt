module.exports = async (req, res) => {
  const { body } = req
  res.send(`Hello ${body.name}, you just parsed the request body!`)
}
// import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3'
// import { IncomingMessage, ServerResponse } from 'http'

// const S3_BUCKET = process.env.S3_BUCKET
//
// const s3 = new S3Client({
//   credentials: {
//     accessKeyId: process.env.S3_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!
//   },
//   region: process.env.S3_REGION,
// })
//
// const parseBody = <T>(req: IncomingMessage): Promise<T> => new Promise<string>(
//   (resolve) => {
//     const requestBody: Uint8Array[] = []
//     req.on('data', chunk => requestBody.push(chunk))
//     req.on('end', () => resolve(Buffer.concat(requestBody).toString()))
//   })
//   .then(body => JSON.parse(body))
//
// export default async (req: IncomingMessage, res: ServerResponse) => {
//   console.log('request url', req.url)
//   if (req.method === 'POST') {
//     // const body: PutObjectCommandInput = await parseBody(req)
//     // const putParams = {...body, Bucket: S3_BUCKET}
//     // const putRes = await s3.send(new PutObjectCommand(putParams))
//     res.end(JSON.stringify({data: 'hi'}))
//   } else {
//     res.end()
//   }
// }
