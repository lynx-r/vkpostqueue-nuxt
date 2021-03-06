import faunadb, { query as q } from 'faunadb'
import { FAUNADB_SECRET } from './constants'

const client = new faunadb.Client({ secret: FAUNADB_SECRET })

export const saveSubscription = async (userId, subscription) => {
  const existedSubscriptions = await client
    .query(
      q.Map(
        q.Filter(
          q.Select('data',
            q.Map(
              q.Paginate(q.Documents(q.Collection('PushSubscribers'))),
              q.Lambda('ref',
                q.Get(q.Var('ref'))
              )
            )
          ),
          q.Lambda('ref', q.Equals(userId, q.Select(['data', 'userId'], q.Var('ref'))))
        ),
        q.Lambda('ref', q.Select('ref', q.Var('ref')))
      )
    )
    .catch(err => console.error('Error: %s', err))
  console.log(existedSubscriptions)
  if (_.isEmpty(existedSubscriptions)) {
    console.log('create')
    await client
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
  } else {
    const ref = existedSubscriptions[0]
    console.log('replace', ref)
    await client
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
