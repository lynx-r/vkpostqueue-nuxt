import faunadb, { query as q } from 'faunadb'
import { FAUNADB_SECRET } from './constants'

const client = new faunadb.Client({ secret: FAUNADB_SECRET!, domain: '' })

export const saveSubscription = (userId: number, subscription: any) =>
  client
    .query(
      q.Create(
        q.Collection('PushSubscribers'),
        {
          data: {
            userId,
            subscription
          }
        }
      )
    )
    .then(ret => console.log(ret))
    .catch(err => console.error('Error: %s', err))

export const getSubscribers = async () => {
  await saveSubscription(1, { a: 2 })
  const subscriptions = await client.query(
    q.Map(q.Paginate(q.Documents(q.Collection('PushSubscribers'))), q.Lambda(x => q.Get(x)))
  )
  console.log(subscriptions)
  return subscriptions
}
