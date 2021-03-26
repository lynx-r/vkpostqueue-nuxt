import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import {
  GetObjectCommand, GetObjectCommandInput,
  ListObjectsV2Command,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client
} from '@aws-sdk/client-s3'
import { Readable } from 'stream'
import { S3Objects } from '../model'
import { NEW_BUCKET_PREFIX, S3_BUCKET } from './constants'
import { parseBody } from './utils'

type PutCommandInput = Omit<PutObjectCommandInput, 'Bucket'>
type GetCommandInput = Omit<GetObjectCommandInput, 'Bucket'>

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!
  },
  region: process.env.S3_REGION,
})

export const signedUrlPut = (putParams: PutCommandInput) =>
  getSignedUrl(s3, new PutObjectCommand({
      ...putParams,
      Bucket: S3_BUCKET
    }),
    {expiresIn: 3600})

export const signedUrlGet = (putParams: GetCommandInput) =>
  getSignedUrl(s3, new GetObjectCommand({
      ...putParams,
      Bucket: S3_BUCKET
    }))

export const sendToS3 = (putParams: PutCommandInput) =>
  s3.send(new PutObjectCommand({
    ...putParams,
    Bucket: S3_BUCKET
  }))

export const getNewsFromS3 = async (): Promise<S3Objects> => {
  const list = await s3.send(new ListObjectsV2Command({
    Bucket: S3_BUCKET,
    Prefix: NEW_BUCKET_PREFIX
  }))
  const keys = list.Contents?.map(o => o.Key!)
  if (keys?.length) {
    const outPromises = keys.map(getObject)
    const promiseResult = await Promise.allSettled(outPromises)
    return promiseResult.filter(o => o.status === 'fulfilled')
      .map(o => (o as PromiseFulfilledResult<Buffer>).value)
      .reduce((acc, cur, i) => {
        const key = keys[i]
        const idxFolder = key.indexOf('/')
        const folder = key.slice(0, idxFolder)
        const file = key.slice(idxFolder + 1)
        acc[folder] = {...acc[folder], [file]: cur}
        return acc
      }, {} as S3Objects)
  }
  return {}
}

const getObject = (key: string): Promise<Buffer> =>
  s3.send(new GetObjectCommand({Bucket: S3_BUCKET, Key: key}))
    .then(o => parseBody(o.Body as Readable))
