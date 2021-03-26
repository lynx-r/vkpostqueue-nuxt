import { Readable } from 'stream'
import { AttachmentType } from '../model'
import { NEW_BUCKET_PREFIX } from '../services'

export const parseJson =
  <T>(req: Readable | NodeJS.ReadableStream): Promise<T> =>
    new Promise<string>(
      (resolve) => {
        const requestBody: Uint8Array[] = []
        req.on('data', chunk => requestBody.push(chunk))
        req.on('end', () => resolve(Buffer.concat(requestBody).toString()))
      })
      .then(body => JSON.parse(body))

export const parseBody =
  <T>(req: Readable): Promise<Buffer> =>
    new Promise<Buffer>(
      (resolve) => {
        const requestBody: Uint8Array[] = []
        req.on('data', chunk => requestBody.push(chunk))
        req.on('end', () => resolve(Buffer.concat(requestBody)))
      })

export const asyncSelfCall = (cb: Function) => {
  (async () => {
    await cb()
  })()
}

export const createObjectKey = (name: string, postOnDate: string, type: AttachmentType) => {
  name += type === 'message' ? '.txt' : ''
  return `${NEW_BUCKET_PREFIX}_${postOnDate}/${type}_${name}`
}
