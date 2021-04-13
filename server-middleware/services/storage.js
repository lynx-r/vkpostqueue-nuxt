import faunadb, { query as q } from 'faunadb'
import { FAUNADB_SECRET } from './constants'

const client = new faunadb.Client({ secret: FAUNADB_SECRET })

export const saveSubscription = (userId, subscription) => {
  const ref = client
    .query(
      q.Select('data',
        q.Map(
          q.Paginate(q.Documents(q.Collection('PushSubscribers'))),
          q.Lambda(['ref'],
            q.Select(['ref'], q.Get(q.Var('ref')))
          )
        )
      )
    )
    .catch(err => console.error('Error: %s', err))
  console.log(ref)
  client
    .query(
      q.Replace(
        ref,
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
      q.Select('data',
        q.Map(
          q.Paginate(q.Documents(q.Collection('PushSubscribers'))),
          q.Lambda(['ref'],
            q.Select(['data', 'subscription'], q.Get(q.Var('ref')))
          )
        )
      )
    )
    .catch(err => console.error('Error: %s', err))
}
