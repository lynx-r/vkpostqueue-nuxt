import { ServerMiddleware } from '@nuxt/types'
// import busboy from 'busboy'
import { MiddlewareResponse } from './model'
// import Busboy = busboy.Busboy

const vkSaveDocs: ServerMiddleware = (req, res) => {
  if (req.method === 'POST') {
    // console.log(req.body)
    // console.log(req.files)
    console.log(req.busboy)
    // eslint-disable-next-line no-undef
    // let doc: {file: NodeJS.ReadableStream, filename: string}, uploadUrl: string
    // const bb = (req as any).busboy as any
    // bb.on('file', (fieldname, file, filename) => {
    //   doc = { file, filename }
    //   console.log(fieldname, file, filename)
    // })
    // bb.on('field', (key, value) => {
    //   uploadUrl = value
    //   console.log(key, value)
    // })
    // bb.end(() => {
    //   console.log(doc, uploadUrl)
    // })
    // req.pipe(bb)
    return res.end(MiddlewareResponse.payloadSuccessAsString())
  }

  console.log('???')

  MiddlewareResponse.failMethodNotAllowed(res)
}

export default vkSaveDocs
