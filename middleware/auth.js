export default async ({redirect, $http}) => {
  const res = await $http.get('/api/isAuthenticated')
  const auth = await res.json();
  if (!auth?.isAuthenticated) {
    redirect({name: 'auth'})
  }
}
