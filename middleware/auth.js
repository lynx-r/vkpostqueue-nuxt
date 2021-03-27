export default async ({$http, $storage, redirect}) => {
  const userId = $storage.getUniversal('userId')
  const isAuthenticated = await $http.post('/api/isAuthenticated', {userId})
    .then(r => r.json())
    .then(b => b.payload.isAuthenticated)
    .catch(e => {
      console.log(e.message)
      return false
    })
  if (!isAuthenticated) {
    return redirect({name: 'auth'})
  }
}
