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
      return this.$storage.getCookie(this.$const.USER_ID_KEY)
    },

    ...mapFields('post', ['message', 'date', 'time', 'images'])
  },

  methods: {
    queuePost () {
      const { userId, postOnDate, message, images } = this
      this.$queuePost({ message, postOnDate, userId, images })
      this.$toast.success(this.$const.NEWS_IN_QUEUE)
    }
  }
}
</script>
