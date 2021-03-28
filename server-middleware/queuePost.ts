import { ServerMiddleware } from '@nuxt/types'
import { Message, MiddlewareResponse } from './model'
import { createObjectKey, MESSAGE_FILENAME, MESSAGE_TYPE, parseJson, savePost, sendToS3 } from './services'

const queuePost: ServerMiddleware = async (req, res) => {
  if (req.method === 'POST') {
    const { message: Body, postOnDate, userId }: Message = await parseJson(req)
    await savePost(userId, postOnDate, Body)

    const Key = createObjectKey(userId, MESSAGE_FILENAME, postOnDate, MESSAGE_TYPE)
    await sendToS3({ Body, Key })
    return res.end(MiddlewareResponse.payloadSuccessAsString())
  }
  MiddlewareResponse.failMethodNotAllowed(res)
}

export default queuePost
