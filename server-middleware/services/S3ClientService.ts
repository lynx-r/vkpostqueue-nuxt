import { Readable } from 'stream'
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3Objects } from '../model'
import {
  NEW_FOLDER_PREFIX,
  POSTED_FOLDER_PREFIX,
  S3_ACCESS_KEY_ID,
  S3_BUCKET,
  S3_REGION,
  S3_SECRET_ACCESS_KEY
} from './constants'
import logger from './logger'
import { parseBody } from './utils'

type PutCommandInput = Omit<PutObjectCommandInput, 'Bucket'>

const s3 = new S3Client({
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID!,
    secretAccessKey: S3_SECRET_ACCESS_KEY!
  },
  region: S3_REGION
})

export const signedUrlPut = (putParams: PutCommandInput) =>
  getSignedUrl(s3, new PutObjectCommand({
    ...putParams,
    Bucket: S3_BUCKET
  }),
  { expiresIn: 3600 })

export const sendToS3 = (putParams: PutCommandInput) =>
  s3.send(new PutObjectCommand({
    ...putParams,
    Bucket: S3_BUCKET
  }))

export const removeNewPrefixOfFolder = async (folder: string) => {
  const listObjects = await s3.send(new ListObjectsV2Command({
    Bucket: S3_BUCKET,
    Prefix: folder
  }))
  const keys = listObjects
    .Contents?.map(({ Key }) =>
      ({ src: Key, dst: Key?.replace(NEW_FOLDER_PREFIX, POSTED_FOLDER_PREFIX) })
    )
  if (!keys?.length) {
    return
  }
  for (const { src, dst } of keys) {
    await s3.send(new CopyObjectCommand({
      Bucket: S3_BUCKET,
      Key: dst,
      CopySource: `${S3_BUCKET}/${src}`
    }))

    await s3.send(new DeleteObjectCommand({
      Bucket: S3_BUCKET,
      Key: src
    }))
  }
  logger.debug(`folder ${folder} moved to posted`)
}

const getObject = (key: string): Promise<Buffer> =>
  s3.send(new GetObjectCommand({ Bucket: S3_BUCKET, Key: key }))
    .then(o => parseBody(o.Body as Readable))

export const getNewsFromS3 = async (): Promise<S3Objects> => {
  const list = await s3.send(new ListObjectsV2Command({
    Bucket: S3_BUCKET,
    Prefix: NEW_FOLDER_PREFIX
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
        acc[folder] = { ...acc[folder], [file]: cur }
        return acc
      }, {} as S3Objects)
  }
  return {}
}
