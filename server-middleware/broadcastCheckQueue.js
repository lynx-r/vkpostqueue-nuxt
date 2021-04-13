import webPush from 'web-push'
import { CHECK_POST_QUEUE_ACTION, getSubscriptions, PRIVATE_VAPID_KEY, PUBLIC_VAPID_KEY } from './services'
import { MiddlewareResponse } from './model'

webPush.setVapidDetails('mailto:test@example.com', PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY)

const broadcastCheckQueue = async (_, res) => {
  const subscriptions = await getSubscriptions()
  console.log(subscriptions)
  for (const subscription of subscriptions) {
    webPush.sendNotification(subscription, CHECK_POST_QUEUE_ACTION)
      .catch(error => console.error(error))
  }
  console.log('broadcast done')
  res.end(MiddlewareResponse.payloadSuccessAsString('broadcast done'))
}

export default broadcastCheckQueue
