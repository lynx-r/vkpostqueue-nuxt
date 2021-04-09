<template>
  <div class="container flex">
    <PostList />
    <PostForm @queuePost="queuePost" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { mapFields } from 'vuex-map-fields'

export default defineComponent({
  name: 'Queue',
  middleware: 'auth',

  computed: {
    userId () {
      return this.$storage.getCookie(this.$const.USER_ID_KEY)
    },

    ...mapFields('post', ['text', 'date', 'time', 'images'])
  },

  methods: {
    queuePost () {
      const { userId, date, time, text, images } = this
      const postOnDate = this.$utils.formatDatetimeISO(date, time)
      this.$queuePost({
        images, postOnDate, text, userId
      })
    }
  }
})
</script>
