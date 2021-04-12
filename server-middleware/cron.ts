import { ServerMiddleware } from '@nuxt/types'
import * as cron from 'node-cron'
import storage from 'node-persist'
import webPush from 'web-push'
import {
  CHECK_POST_CRON,
  CHECK_POST_QUEUE_ACTION,
  PRIVATE_VAPID_KEY,
  PUBLIC_VAPID_KEY,
  SUBSCRIPTION_KEY
} from './services'

webPush.setVapidDetails('mailto:test@example.com', PUBLIC_VAPID_KEY!, PRIVATE_VAPID_KEY!)

cron.schedule(CHECK_POST_CRON, async () => {
  const subscriptions = await storage.values(value => value.key.startsWith(SUBSCRIPTION_KEY))
  for (const subscription of subscriptions) {
    webPush.sendNotification(subscription, CHECK_POST_QUEUE_ACTION)
      .catch(error => console.error(error))
  }
  console.log('broadcast done')
})

const cronService: ServerMiddleware = (_, res) => {
  res.end()
}

export default cronService
