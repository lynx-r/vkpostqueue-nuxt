import { Middleware } from '@nuxt/types'
import { USER_ID } from '~/constants'

const auth: Middleware = async ({$http, $storage, redirect}) => {
  const userId = $storage.getUniversal(USER_ID)
  const isAuthenticated = await $http.post('/api/isAuthenticated', {userId})
    .then(r => r.json())
    .then(({payload: {isAuthenticated}}) => isAuthenticated)
    .catch(e => {
      console.log(e.message)
      return false
    })
  if (!isAuthenticated) {
    return redirect({name: 'auth'})
  }
}

export default auth
