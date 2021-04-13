import { ServerMiddleware } from '@nuxt/types'
import * as cron from 'node-cron'
import webPush from 'web-push'
import {
  CHECK_POST_CRON,
  CHECK_POST_QUEUE_ACTION,
  getSubscribers,
  PRIVATE_VAPID_KEY,
  PUBLIC_VAPID_KEY
} from './services'

webPush.setVapidDetails('mailto:test@example.com', PUBLIC_VAPID_KEY!, PRIVATE_VAPID_KEY!)

cron.schedule(CHECK_POST_CRON, async () => {
  const subscribers = await getSubscribers()
  for (const subscription of subscribers) {
    webPush.sendNotification(subscription, CHECK_POST_QUEUE_ACTION)
      .catch(error => console.error(error))
  }
  console.log('broadcast done')
})

const cronService: ServerMiddleware = async (_, res) => {
  console.log(await getSubscribers())
  res.end('')
}

export default cronService
