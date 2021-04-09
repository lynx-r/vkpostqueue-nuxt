<template>
  <span>
    {{ formatPostOnDate(message.postOnDate) }}: {{ message.slug }}
    <Button @click="$emit('remove', message.id)">x</Button>
  </span>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PostListItem',
  props: {
    message: {
      type: Object,
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

<style scoped>

</style>
