import { S3Objects } from '../model'

export const signedUrlPut = (putParams: any) => putParams

export const sendToS3 = (putParams: any) => putParams

export const removeNewPrefixOfFolder = async (folder: string) => {
  // const listObjects = await s3.send(new ListObjectsV2Command({
  //   Bucket: S3_BUCKET,
  //   Prefix: folder
  // }))
  // const keys = listObjects
  //   .Contents?.map(({ Key }) =>
  //     ({ src: Key, dst: Key?.replace(NEW_FOLDER_PREFIX, POSTED_FOLDER_PREFIX) })
  //   )
  // if (!keys?.length) {
  //   return
  // }
  // for (const { src, dst } of keys) {
  //   await s3.send(new CopyObjectCommand({
  //     Bucket: S3_BUCKET,
  //     Key: dst,
  //     CopySource: `${S3_BUCKET}/${src}`
  //   }))
  //
  //   await s3.send(new DeleteObjectCommand({
  //     Bucket: S3_BUCKET,
  //     Key: src
  //   }))
  // }
  // logger.debug(`folder ${folder} moved to posted`)
  return await Promise.resolve(folder)
}

// const getObject = (key: string): Promise<Buffer> => Promise.resolve(Buffer.from(key))
// s3.send(new GetObjectCommand({ Bucket: S3_BUCKET, Key: key }))
//   .then(o => parseBody(o.Body as Readable))

export const getNewsFromS3 = async (): Promise<S3Objects> => {
  // const list = await s3.send(new ListObjectsV2Command({
  //   Bucket: S3_BUCKET,
  //   Prefix: NEW_FOLDER_PREFIX
  // }))
  // const keys = list.Contents?.map(o => o.Key!)
  // if (keys?.length) {
  //   const outPromises = keys.map(getObject)
  //   const promiseResult = await Promise.allSettled(outPromises)
  //   return promiseResult.filter(o => o.status === 'fulfilled')
  //     .map(o => (o as PromiseFulfilledResult<Buffer>).value)
  //     .reduce((acc, cur, i) => {
  //       const key = keys[i]
  //       const idxFolder = key.indexOf('/')
  //       const folder = key.slice(0, idxFolder)
  //       const file = key.slice(idxFolder + 1)
  //       acc[folder] = { ...acc[folder], [file]: cur }
  //       return acc
  //     }, {} as S3Objects)
  // }
  return await Promise.resolve({})
}
