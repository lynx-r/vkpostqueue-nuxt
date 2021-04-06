<template>
  <div class="container flex">
    <PostList :queue="queue" />
    <PostForm @queuePost="queuePost" />
  </div>
</template>

<script lang="ts">
import { parse, formatISO } from 'date-fns'
import _ from 'lodash'
import { DocsStore } from 'plugins/model'
import { defineComponent } from '@nuxtjs/composition-api'
import { mapFields } from 'vuex-map-fields'

export default defineComponent({
  name: 'Post',
  middleware: 'auth',

  data () {
    return {
      queue: []
    }
  },

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

  mounted () {
    const userId = this.$storage.getCookie(this.$const.USER_ID_KEY)
    const queue: DocsStore = this.$storage.getLocalStorage(userId)
    this.queue = _.entries(queue)
      .flatMap(([postOnDate, q]) => (q.filter(p => p.title).map(p => ({ postOnDate, title: p.title }))))
  },

  methods: {
    queuePost () {
      const { userId, postOnDate, message, images } = this
      this.$queuePost({ message, postOnDate, userId, images })
      this.$toast.success(this.$const.NEWS_IN_QUEUE)
    }
  }

})
</script>
