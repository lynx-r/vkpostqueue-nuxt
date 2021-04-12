import { ServerMiddleware } from '@nuxt/types'
import * as cron from 'node-cron'
import storage from 'node-persist'
import webPush from 'web-push'
import { CHECK_POST_QUEUE_ACTION, PRIVATE_VAPID_KEY, PUBLIC_VAPID_KEY, SUBSCRIPTION_KEY } from './services'

webPush.setVapidDetails('mailto:test@example.com', PUBLIC_VAPID_KEY!, PRIVATE_VAPID_KEY!)

cron.schedule('*/30 * * * *', async () => {
  const subscriptions = await storage.values(value => value.key.startsWith(SUBSCRIPTION_KEY))
  const payload = JSON.stringify({ action: CHECK_POST_QUEUE_ACTION })
  for (const subscription of subscriptions) {
    webPush.sendNotification(subscription, payload)
      .catch(error => console.error(error))
  }
  console.log('broadcast done')
})

const cronService: ServerMiddleware = (_, res) => {
  res.end()
}

export default cronService
