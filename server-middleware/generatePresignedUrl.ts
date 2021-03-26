import { IncomingMessage, ServerResponse } from 'http'
import { KeyBuilder, MiddlewareResponse } from './model'
import { createObjectKey, parseJson, presignedUrl } from './services'

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'POST') {
    const {name, postOnDate}: KeyBuilder = await parseJson(req)
    const Key = createObjectKey(name, postOnDate, 'image')
    const url = await presignedUrl({Key})
    return res.end(MiddlewareResponse.payloadSuccessAsString({url}))
  }

  MiddlewareResponse.failMethodNotAllowed(res)
}
