import faunadb, { query as q } from 'faunadb'
import { FAUNADB_SECRET } from './constants'

const client = new faunadb.Client({ secret: FAUNADB_SECRET })

export const saveSubscription = (userId, subscription) =>
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
  const subscriptions = await client
    .query(
      q.Map(q.Paginate(q.Documents(q.Collection('PushSubscribers'))), q.Lambda(x => q.Get(x)))
    )
    .then(({ data }) => data)
    .catch(err => console.error('Error: %s', err))

  return subscriptions.map(({ data }) => data)
}
