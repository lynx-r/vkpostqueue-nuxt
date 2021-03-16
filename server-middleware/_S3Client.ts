import { S3Client as _S3Client } from '@aws-sdk/client-s3'

export const S3Client = new _S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!
  },
  region: process.env.S3_REGION
})
