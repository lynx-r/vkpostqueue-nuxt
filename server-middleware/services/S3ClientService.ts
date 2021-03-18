import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client
} from '@aws-sdk/client-s3'
import { Readable } from 'stream'
import { NEW_BUCKET_PREFIX, S3_BUCKET } from './constants'
import { parseBody } from './utils'

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!
  },
  region: process.env.S3_REGION,
})

export const sendToS3 = (putParams: any) =>
  s3.send(new PutObjectCommand({
    ...putParams,
    Bucket: S3_BUCKET
  }))

export const getNewsFromS3 = async (): Promise<string[]> => {
  const list = await s3.send(new ListObjectsV2Command({
    Bucket: S3_BUCKET,
    Prefix: NEW_BUCKET_PREFIX
  }))
  const keys = list.Contents?.map(o => o.Key!)
  if (keys?.length) {
    const outPromises = keys.map(getObject)
    const promiseResult = await Promise.allSettled(outPromises)
    return promiseResult.filter(o => o.status === 'fulfilled')
      .map((o) => (o as PromiseFulfilledResult<string>).value)
  }
  return []
}

const getObject = <T>(key: string): Promise<T> =>
  s3.send(new GetObjectCommand({Bucket: S3_BUCKET, Key: key}))
    .then(o => parseBody(o.Body as Readable, 'plain'))
