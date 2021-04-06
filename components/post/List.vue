<template>
  <div class="container">
    <draggable
      v-model="queue"
      group="people"
      @start="drag=true"
      @end="drag=false"
    >
      <ul v-for="post in queue" :key="post.postOnDate">
        <li>{{ formatPostOnDate(post.postOnDate) }}: {{ post.title }}</li>
      </ul>
    </draggable>
  </div>
</template>

<script lang="ts">
import draggable from 'vuedraggable'
import _ from 'lodash'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'List',
  components: {
    draggable
  },

  props: {
    queue: {
      type: Array,
      required: true
    }
  },

  methods: {
    formatPostOnDate (dateStr: string) {
      const d = this.$dateFns.parseISO(dateStr)
      return this.$dateFns.format(d, this.$const.DATETIME_FMT)
    }
  }
})
</script>

<style lang="css" scoped >

</style>
