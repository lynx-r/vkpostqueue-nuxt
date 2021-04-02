<template>
  <div class="container">
    В работе
    <!--    <ul v-for="post of posts" :key="post.postOnDate">-->
    <!--      <li>{{ post.postOnDate }}: {{ post.preview }}</li>-->
    <!--    </ul>-->
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  middleware: 'auth'

  // async asyncData ({ $http, $storage }) {
  //   const { USER_ID_KEY, POST_ATTACHMENTS } = this.$const
  //   const userId = $storage.getUniversal(USER_ID_KEY)
  //   const posts = await $http.post('/api/listPosts', { userId })
  //     .then(r => r.json())
  //     .then(({ payload: { posts } }) => posts)
  //     .then(posts => posts?.filter(p => !POST_ATTACHMENTS.includes(p.preview)))
  //   return { posts }
  // }
})
</script>
