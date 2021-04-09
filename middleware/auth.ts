import { Middleware } from '@nuxt/types'

const auth: Middleware = ({ redirect, $ctxUtils }) => {
  const userId = $ctxUtils.getUserId()
  if (!userId) {
    return redirect({ name: 'auth' })
  }
}

export default auth
