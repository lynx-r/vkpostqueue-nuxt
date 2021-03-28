import { ServerMiddleware } from '@nuxt/types'
import { KeyBuilder, MiddlewareResponse } from './model'
import { createObjectKey, parseJson, PHOTO_TYPE, savePost, signedUrlPut } from './services'

const getSignedUrl: ServerMiddleware = async (req, res) => {
  if (req.method === 'POST') {
    const { name, postOnDate, userId }: KeyBuilder = await parseJson(req)
    const Key = createObjectKey(userId, name, postOnDate, PHOTO_TYPE)
    await savePost(userId, Key, postOnDate, PHOTO_TYPE)
    const signedUrl = await signedUrlPut({ Key })
    return res.end(MiddlewareResponse.payloadSuccessAsString({ signedUrl }))
  }

  MiddlewareResponse.failMethodNotAllowed(res)
}
export default getSignedUrl
