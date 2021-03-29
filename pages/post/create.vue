<template>
  <div class="container">
    <PostForm @queuePost="queuePost" />
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { parse, formatISO } from 'date-fns'

export default {
  middleware: 'auth',

  computed: {
    postOnDate () {
      const date = parse(this.date + '_' + this.time, this.$const.DATE_FMT + '_' + this.$const.TIME_FMT, new Date())
      return formatISO(date)
    },

    userId () {
      return this.$storage.getUniversal(this.$const.USER_ID)
    },

    ...mapFields('post', ['message', 'date', 'time', 'images'])
  },

  methods: {
    queuePost () {
      // console.log(this.$saveMessage)
      this.$saveMessage('hi')
      // const { userId, postOnDate, message, images } = this
      // await this.$http.post('/api/queuePost', { message, postOnDate, userId })
      //
      // for (const image of images) {
      //   const urlParams = { name: image.name, postOnDate, userId }
      //   const signedUrl = await this.$http.post('/api/getSignedUrl', urlParams)
      //     .then(r => r.json())
      //     .then(({ payload: { signedUrl } }) => signedUrl)
      //   await this.$http.put(signedUrl, image)
      // }

      this.$toast.success(this.$const.NEWS_IN_QUEUE)
    }
  }
}
</script>
