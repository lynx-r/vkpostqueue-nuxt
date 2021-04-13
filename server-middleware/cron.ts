import { ServerMiddleware } from '@nuxt/types'
import { getSubscribers } from './services'

// webPush.setVapidDetails('mailto:test@example.com', PUBLIC_VAPID_KEY!, PRIVATE_VAPID_KEY!)

// cron.schedule(CHECK_POST_CRON, async () => {
// const subscriptions = await getSubscribers()
// for (const subscription of subscriptions) {
//   webPush.sendNotification(subscription, CHECK_POST_QUEUE_ACTION)
//     .catch(error => console.error(error))
// }
// console.log('broadcast done')
// })

const cronService: ServerMiddleware = async (_, res) => {
  console.log('???')
  await getSubscribers()
  res.end('')
}

export default cronService
