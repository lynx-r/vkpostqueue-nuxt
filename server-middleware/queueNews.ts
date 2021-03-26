import { IncomingMessage, ServerResponse } from 'http'
import { Message, MiddlewareResponse, News } from './model'
import { createObjectKey, parseJson, sendToS3 } from './services'

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'POST') {
    const {message: Body, postOnDate, name}: Message = await parseJson(req)
    const Key = createObjectKey(name, postOnDate, 'message')
    const putRes = await sendToS3({Body, Key})
    return res.end(MiddlewareResponse.payloadSuccessAsString(putRes))
    // return res.end(MiddlewareResponse.payloadSuccessAsString())
  }
  MiddlewareResponse.failMethodNotAllowed(res)
}
