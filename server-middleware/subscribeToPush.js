import webPush from 'web-push'
import { MiddlewareResponse } from './model'

const publicVapidKey = process.env.PUBLIC_VAPID_KEY
const privateVapidKey = process.env.PRIVATE_VAPID_KEY

webPush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey)

const subscribeToPush = (req, res) => {
  const { subscription } = req.body

  res.statusCode = 201
  res.end(MiddlewareResponse.payloadSuccessAsString())

  const payload = JSON.stringify({
    title: 'Push notifications with Service Workers'
  })

  webPush.sendNotification(subscription, payload)
    .catch(error => console.error(error))
}

export default subscribeToPush
