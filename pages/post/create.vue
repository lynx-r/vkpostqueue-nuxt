<template>
  <div class="container">
    <PostForm @queuePost="queuePost"/>
  </div>
</template>

<script>
import { USER_ID } from '~/constants'
import { mapFields } from 'vuex-map-fields'

export default {
  middleware: 'auth',

  methods: {
    async queuePost() {
      const {userId, postOnDate, message, images} = this
      await this.$http.post('/api/queuePost', {message, postOnDate, userId})

      for (const image of images) {
        const urlParams = {name: image.name, postOnDate, userId}
        const signedUrl = await this.$http.post('/api/getSignedUrl', urlParams)
            .then(r => r.json())
            .then(({payload: {signedUrl}}) => signedUrl)
        await this.$http.put(signedUrl, image)
      }

      this.$toast.success('Новость поставлена в очередь')
    }
  },

  computed: {
    postOnDate() {
      return this.date + '_' + this.time
    },

    userId() {
      return this.$storage.getUniversal(USER_ID)
    },

    ...mapFields('post', ['message', 'date', 'time', 'images'],)
  }
}
</script>
