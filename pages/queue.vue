<template>
  <div class="container flex">
    <PostList />
    <PostForm @queuePost="queuePost" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { formatISO, parse } from 'date-fns'
import { mapFields } from 'vuex-map-fields'

export default defineComponent({
  name: 'Queue',
  middleware: 'auth',

  computed: {
    postOnDate () {
      const datetime = this.$utils.dateTimeFormatter(this.date, this.time)
      const date = parse(datetime, this.$const.DATETIME_FMT, new Date())
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
    }
  }

})
</script>
