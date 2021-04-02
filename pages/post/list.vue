<template>
  <div class="container">
    <ul v-for="post of queue" :key="post.postOnDate">
      <li>{{ formatPostOnDate(post.postOnDate) }}: {{ post.title }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import _ from 'lodash'
import { DocsStore } from 'plugins/model'

export default defineComponent({
  middleware: 'auth',

  data () {
    return {
      queue: []
    }
  },

  mounted () {
    const userId = this.$storage.getLocalStorage(this.$const.USER_ID_KEY)
    const queue: DocsStore = this.$storage.getLocalStorage(userId)
    this.queue = _.entries(queue)
      .flatMap(([postOnDate, q]) => (q.filter(p => p.title).map(p => ({ postOnDate, title: p.title }))))
  },

  methods: {
    formatPostOnDate (dateStr: string) {
      const d = this.$dateFns.parseISO(dateStr)
      return this.$dateFns.format(d, this.$const.DATETIME_FMT)
    }
  }
})
</script>
