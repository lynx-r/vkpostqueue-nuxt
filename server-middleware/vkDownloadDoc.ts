import { ServerMiddleware } from '@nuxt/types'
import fetch from 'node-fetch'
import { MiddlewareResponse } from './model'
import { VkDownloadDocRequest } from '~/plugins/model'

const vkDownloadDoc: ServerMiddleware = async (req, res) => {
  if (req.method === 'POST') {
    const { url, type } = req.body as VkDownloadDocRequest
    const downloaded = await fetch(url, { method: 'GET' })
    if (type === 'msg') {
      const txt = await downloaded.text()
      return res.end(MiddlewareResponse.payloadSuccessAsString(txt))
    } else if (type === 'img') {
      const blob = await downloaded.arrayBuffer()
      const buffer = Buffer.from(blob)
      return res.end(buffer)
    } else {
      MiddlewareResponse.failBadRequest(res)
      return
    }
  }

  MiddlewareResponse.failMethodNotAllowed(res)
}

export default vkDownloadDoc
