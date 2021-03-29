import { Middleware } from '@nuxt/types'
// import { USER_ID_KEY } from '~/plugins/constants'

const auth: Middleware = ({ $storage, $const, redirect }) => {
  const userId = $storage.getCookie($const.USER_ID_KEY)
  console.log(userId)
  // const isAuthenticated = await $http.post('/api/isAuthenticated', { userId })
  //   .then(r => r.json())
  //   .then(({ payload: { isAuthenticated } }) => isAuthenticated)
  //   .catch(() => {
  //     return false
  //   })
  if (!userId) {
    return redirect({ name: 'auth' })
  }
}

export default auth
