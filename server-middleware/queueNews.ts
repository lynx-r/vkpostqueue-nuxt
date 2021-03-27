import { IncomingMessage, ServerResponse } from 'http'
import { Message, MiddlewareResponse } from './model'
import { createObjectKey, MESSAGE_FILENAME, MESSAGE_TYPE, parseJson, sendToS3 } from './services'

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'POST') {
    const {message: Body, postOnDate, userId}: Message = await parseJson(req)
    const Key = createObjectKey(userId, MESSAGE_FILENAME, postOnDate, MESSAGE_TYPE)
    const putRes = await sendToS3({Body, Key})
    return res.end(MiddlewareResponse.payloadSuccessAsString(putRes))
  }
  MiddlewareResponse.failMethodNotAllowed(res)
}
