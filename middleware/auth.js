export default async ({redirect, $http, $storage}) => {
  const userId = $storage.getUniversal('userId')
  const res = await $http.post('/api/isAuthenticated', {userId})
  const auth = await res.json()
  if (!auth?.isAuthenticated) {
    return redirect({name: 'auth'})
  }
}
