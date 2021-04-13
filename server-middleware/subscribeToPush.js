import { MiddlewareResponse } from './model'
import { saveSubscription } from './services'

const subscribeToPush = async (req, res) => {
  const { subscription, userId } = req.body

  await saveSubscription(userId, subscription)

  res.statusCode = 201
  res.end(MiddlewareResponse.payloadSuccessAsString())
}

export default subscribeToPush
