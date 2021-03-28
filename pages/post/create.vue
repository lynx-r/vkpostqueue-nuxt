<template>
  <div class="container">
    <PostForm @queuePost="queuePost" />
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { parse, formatISO } from 'date-fns'

import { DATE_FMT, NEWS_IN_QUEUE, TIME_FMT, USER_ID } from '~/constants'

export default {
  middleware: 'auth',

  computed: {
    postOnDate () {
      const date = parse(this.date + '_' + this.time, DATE_FMT + '_' + TIME_FMT, new Date())
      return formatISO(date)
    },

    userId () {
      return this.$storage.getUniversal(USER_ID)
    },

    ...mapFields('post', ['message', 'date', 'time', 'images'])
  },

  methods: {
    async queuePost () {
      const { userId, postOnDate, message, images } = this
      await this.$http.post('/api/queuePost', { message, postOnDate, userId })

      for (const image of images) {
        const urlParams = { name: image.name, postOnDate, userId }
        const signedUrl = await this.$http.post('/api/getSignedUrl', urlParams)
          .then(r => r.json())
          .then(({ payload: { signedUrl } }) => signedUrl)
        await this.$http.put(signedUrl, image)
      }

      this.$toast.success(NEWS_IN_QUEUE)
    }
  }
}
</script>
