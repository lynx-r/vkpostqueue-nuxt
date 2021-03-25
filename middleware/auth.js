export default async ({redirect, $http, store}) => {
  console.log(store.getters);
  const userId = store.getters['auth/userId']
  const res = await $http.post('/api/isAuthenticated', {userId})
  const auth = await res.json();
  if (!auth?.isAuthenticated) {
    redirect({name: 'auth'})
  }
}
