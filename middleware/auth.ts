import { Middleware } from '@nuxt/types'

const auth: Middleware = ({ $storage, $const, redirect }) => {
  const userId = $storage.getCookie($const.USER_ID_KEY)
  if (!userId) {
    return redirect({ name: 'auth' })
  }
}

export default auth
