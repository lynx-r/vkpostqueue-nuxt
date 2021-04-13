import faunadb, { query as q } from 'faunadb'
import { FAUNADB_SECRET } from './constants'

const client = new faunadb.Client({ secret: FAUNADB_SECRET })

export const saveSubscription = (userId, subscription) => {
  const exists = client
    .query(
      q.ContainsValue(userId,
        q.SelectAll(['data', 'data', 'userId'],
          q.Map(
            q.Paginate(q.Documents(q.Collection('PushSubscribers'))),
            q.Lambda(x => q.Get(x))
          ))
      )
    )
    .catch(err => console.error('Error: %s', err))
  if (exists) {
    return
  }

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
}

export const getSubscriptions = async () => {
  return await client
    .query(
      q.SelectAll(['data', 'data', 'subscription'],
        q.Map(q.Paginate(q.Documents(q.Collection('PushSubscribers'))), q.Lambda(x => q.Get(x)))
      )
    )
    .catch(err => console.error('Error: %s', err))
}
