import { IncomingMessage } from 'http'

export const parseBody = <T>(req: IncomingMessage): Promise<T> => new Promise<string>(
  (resolve) => {
    const requestBody: Uint8Array[] = []
    req.on('data', chunk => requestBody.push(chunk))
    req.on('end', () => resolve(Buffer.concat(requestBody).toString()))
  })
  .then(body => JSON.parse(body))
