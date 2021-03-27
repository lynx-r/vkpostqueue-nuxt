import { IncomingMessage, ServerResponse } from 'http'
import { KeyBuilder, MiddlewareResponse } from './model'
import { createObjectKey, parseJson, PHOTO_TYPE, signedUrlPut } from './services'

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'POST') {
    const {name, postOnDate, userId}: KeyBuilder = await parseJson(req)
    const Key = createObjectKey(userId, name, postOnDate, PHOTO_TYPE)
    const url = await signedUrlPut({Key})
    return res.end(MiddlewareResponse.payloadSuccessAsString({url}))
  }

  MiddlewareResponse.failMethodNotAllowed(res)
}
