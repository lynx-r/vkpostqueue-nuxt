import { Readable } from 'stream'
import storage from 'node-persist'
import { SUBSCRIPTION_KEY } from './constants'

(async () => {
  await storage.init()
})()

export const parseBody =
  (req: Readable): Promise<Buffer> =>
    new Promise<Buffer>(
      (resolve) => {
        const requestBody: Uint8Array[] = []
        req.on('data', chunk => requestBody.push(chunk))
        req.on('end', () => resolve(Buffer.concat(requestBody)))
      })

const subscriptionKey = (userId: number) => SUBSCRIPTION_KEY + userId

export const saveSubscription = (userId: number, subscription: any) =>
  storage.setItem(subscriptionKey(userId), subscription)
