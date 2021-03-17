import { GetObjectCommand, PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!
  },
  region: process.env.S3_REGION,
})

const S3_BUCKET = process.env.S3_BUCKET

export const sendToS3 = (putParams: PutObjectCommandInput) =>
  s3.send(new PutObjectCommand({
    ...putParams,
    Bucket: S3_BUCKET
  }))

// export const getFromS3 = (putParams: PutObjectCommandInput) =>
//   s3.send(new GetObjectCommand({
//     Range: '',
//     Bucket: S3_BUCKET
//   }))
