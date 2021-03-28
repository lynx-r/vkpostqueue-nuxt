<template>
  <div class="container">
    <ul v-for="post of posts" :key="post.postOnDate">
      <li>{{ post.postOnDate }}: {{ post.preview }}</li>
    </ul>
  </div>
</template>

<script>
import { USER_ID } from '~/constants'

export default {
  middleware: 'auth',

  async asyncData ({ $http, $storage }) {
    const userId = $storage.getUniversal(USER_ID)
    const posts = await $http.post('/api/listPosts', { userId })
      .then(r => r.json())
      .then(({ payload: { posts } }) => posts)
    return { posts }
  }

}
</script>
