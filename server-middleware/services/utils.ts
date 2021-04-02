import { Readable } from 'stream'

export const parseBody =
  (req: Readable): Promise<Buffer> =>
    new Promise<Buffer>(
      (resolve) => {
        const requestBody: Uint8Array[] = []
        req.on('data', chunk => requestBody.push(chunk))
        req.on('end', () => resolve(Buffer.concat(requestBody)))
      })
