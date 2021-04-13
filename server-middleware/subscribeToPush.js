import cron from 'node-cron'
import webPush from 'web-push'
import { MiddlewareResponse } from './model'
import {
  CHECK_POST_CRON,
  CHECK_POST_QUEUE_ACTION, getSubscriptions,
  PRIVATE_VAPID_KEY,
  PUBLIC_VAPID_KEY,
  saveSubscription
} from './services'

webPush.setVapidDetails('mailto:test@example.com', PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY)

cron.schedule(CHECK_POST_CRON, async () => {
  const subscriptions = await getSubscriptions()
  console.log(subscriptions)
  for (const subscription of subscriptions) {
    webPush.sendNotification(subscription, CHECK_POST_QUEUE_ACTION)
      .catch(error => console.error(error))
  }
  console.log('broadcast done')
})

const subscribeToPush = async (req, res) => {
  const { subscription, userId } = req.body

  await saveSubscription(userId, subscription)

  res.statusCode = 201
  res.end(MiddlewareResponse.payloadSuccessAsString())
}

export default subscribeToPush
