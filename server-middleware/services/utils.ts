import { Readable } from 'stream'

type ContentType = 'json' | 'plain'

export const parseBody =
  <T>(req: Readable, contentType: ContentType = 'json'): Promise<T> =>
    new Promise<string>(
      (resolve) => {
        const requestBody: Uint8Array[] = []
        req.on('data', chunk => requestBody.push(chunk))
        req.on('end', () => resolve(Buffer.concat(requestBody).toString()))
      })
      .then(body => contentType === 'plain' ? body : JSON.parse(body))
