import { Readable } from 'stream'
import { ServerMiddleware } from '@nuxt/types'
import fetch from 'node-fetch'
import FormData from 'form-data'
import { MiddlewareResponse } from './model'
import { parseBody } from './services'

type FormDataPayload = [{file: Buffer, filename: string}, {uploadUrl: string}]

const vkSaveDocs: ServerMiddleware = async (req, res) => {
  if (req.method === 'POST') {
    const busboy: any = (req as any).busboy
    const filePromise = new Promise(resolve =>
      busboy.on('file', (fieldname: string, data: Readable, filename: string) =>
        fieldname === 'file' && parseBody(data).then(file => resolve({ file, filename }))
      )
    )

    const uploadUrlPromise = new Promise(resolve =>
      busboy.on('field', (fieldname: string, uploadUrl: string) =>
        fieldname === 'uploadUrl' && resolve({ uploadUrl }))
    )

    const payload = await Promise.all([filePromise, uploadUrlPromise]) as FormDataPayload
    const { file, filename } = payload[0]
    const { uploadUrl } = payload[1]
    const body = new FormData()
    body.append('file', file, { filename })
    const r = await fetch(uploadUrl, { method: 'POST', body })
      .then(r => r.json())
    return res.end(MiddlewareResponse.payloadSuccessAsString(r))
  }

  MiddlewareResponse.failMethodNotAllowed(res)
}

export default vkSaveDocs
