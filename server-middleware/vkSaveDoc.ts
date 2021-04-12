import { Readable } from 'stream'
import { ServerMiddleware } from '@nuxt/types'
import fetch from 'node-fetch'
import FormData from 'form-data'
import { MiddlewareResponse } from './model'
import { parseBody } from './services'

type FilePayload = {file: Buffer, filename: string, fieldname: string}
type FieldPayload = {uploadUrl: string}

const vkSaveDocs: ServerMiddleware = async (req, res) => {
  if (req.method === 'POST') {
    const busboy: any = (req as any).busboy
    const filePromise: Promise<FilePayload> = new Promise(resolve =>
      busboy.on('file', (fieldname: string, data: Readable, filename: string) =>
        (fieldname === 'file' || fieldname === 'photo') &&
        parseBody(data).then(file => resolve({ file, filename, fieldname }))
      )
    )

    const uploadUrlPromise: Promise<FieldPayload> = new Promise(resolve =>
      busboy.on('field', (fieldname: string, uploadUrl: string) =>
        fieldname === 'uploadUrl' && resolve({ uploadUrl }))
    )

    const payload = await Promise.all([filePromise, uploadUrlPromise])
    const { file, filename, fieldname } = payload[0]
    const { uploadUrl } = payload[1]
    const body = new FormData()
    body.append(fieldname, file, { filename })
    const r = await fetch(uploadUrl, { method: 'POST', body })
      .then(r => r.json())
    return res.end(MiddlewareResponse.payloadSuccessAsString(r))
  }

  MiddlewareResponse.failMethodNotAllowed(res)
}

export default vkSaveDocs
