<template>
  <div class="container">
    <PostForm @queuePost="queuePost"/>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import PostForm from '~/components/PostForm.vue'

export default {
  middleware: 'auth',
  components: {
    PostForm,
  },

  methods: {
    async queuePost() {
      try {
        const userId = this.$storage.getUniversal('userId')
        const postOnDate = this.date + '_' + this.time
        let putParams = {message: this.message, postOnDate, userId}
        let res = await this.$http.post('/api/queueNews', putParams)

        for (const image of this.images) {
          const urlParams = {name: image.name, postOnDate, method: 'put', userId}
          res = await this.$http.post('/api/generateSignedUrl', urlParams)
          const {payload: {url}} = await res.json()
          res = await this.$http.put(url, image)
        }

        this.$toast.success('Новость поставлена в очередь')
      } catch (err) {
        this.$toast.error(err.message)
        console.log('Error', err)
      }
    }
  },

  computed: {
    ...mapFields('post', ['message', 'date', 'time', 'images'],)
  }
}
</script>

<style>
</style>
