import { defineNuxtMiddleware } from '@nuxtjs/composition-api';

const auth = async ({redirect, $http, store, req, storage, $storage}) => {
  const userId = $storage.getUniversal('userId')
  console.log(userId);
  const res = await $http.post('/api/isAuthenticated', {userId});
  const auth = await res.json();
  if (!auth?.isAuthenticated) {
    return redirect({name: 'auth'});
  }
};

export default defineNuxtMiddleware(auth);
