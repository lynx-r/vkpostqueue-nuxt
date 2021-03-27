import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import {
  CopyObjectCommand, DeleteObjectCommand,
  GetObjectCommand, GetObjectCommandInput,
  ListObjectsV2Command,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3'
import { Readable } from 'stream'
import { S3Objects } from '../model'
import { NEW_FOLDER_PREFIX, POSTED_FOLDER_PREFIX, S3_BUCKET } from './constants'
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

export function signedUrlPut(putParams: PutCommandInput) {
  return getSignedUrl(s3, new PutObjectCommand({
      ...putParams,
      Bucket: S3_BUCKET
    }),
    {expiresIn: 3600})
}

export function signedUrlGet(putParams: GetCommandInput) {
  return getSignedUrl(s3, new GetObjectCommand({
    ...putParams,
    Bucket: S3_BUCKET
  }))
}

export function sendToS3(putParams: PutCommandInput) {
  return s3.send(new PutObjectCommand({
    ...putParams,
    Bucket: S3_BUCKET
  }))
}

export async function removeNewPrefixOfFolder(folder: string) {
  const listObjects = await s3.send(new ListObjectsV2Command({
    Bucket: S3_BUCKET,
    Prefix: folder,
  }))
  const keys = listObjects
    .Contents?.map(({Key}) =>
      ({src: Key, dst: Key?.replace(NEW_FOLDER_PREFIX, POSTED_FOLDER_PREFIX)})
    )
  if (!keys?.length) {
    return
  }
  for (const {src, dst} of keys) {
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
}

function getObject(key: string): Promise<Buffer> {
  return s3.send(new GetObjectCommand({Bucket: S3_BUCKET, Key: key}))
    .then(o => parseBody(o.Body as Readable))
}

export async function getNewsFromS3(): Promise<S3Objects> {
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
        acc[folder] = {...acc[folder], [file]: cur}
        return acc
      }, {} as S3Objects)
  }
  return {}
}
