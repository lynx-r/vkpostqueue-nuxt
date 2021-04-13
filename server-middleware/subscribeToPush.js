import webPush from 'web-push'
import { saveSubscription, PRIVATE_VAPID_KEY, PUBLIC_VAPID_KEY } from './services'
import { MiddlewareResponse } from './model'

webPush.setVapidDetails('mailto:test@example.com', PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY)

const subscribeToPush = async (req, res) => {
  const { subscription, userId } = req.body

  await saveSubscription(userId, subscription)

  res.statusCode = 201
  res.end(MiddlewareResponse.payloadSuccessAsString())
}

export default subscribeToPush
