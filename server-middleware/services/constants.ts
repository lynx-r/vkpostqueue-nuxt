export const SUBSCRIPTION_KEY = 'subscription'
export const CHECK_POST_QUEUE_ACTION = process.env.CHECK_POST_QUEUE_ACTION
export const PUBLIC_VAPID_KEY = process.env.PUBLIC_VAPID_KEY
export const PRIVATE_VAPID_KEY = process.env.PRIVATE_VAPID_KEY
export const CHECK_POST_INTERVAL_MIN = process.env.CHECK_POST_INTERVAL_MIN
export const CHECK_POST_CRON = `*/${CHECK_POST_INTERVAL_MIN} * * * *`
export const FAUNADB_SECRET = process.env.FAUNADB_SECRET
