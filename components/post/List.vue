<template>
  <ul class="space-y-4">
    <li v-for="message in messages" :key="message.id">
      <PostListItem
        :message="message"
        @edit="$emit('edit', $event)"
        @remove="$emit('remove', $event)"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { mapFields } from 'vuex-map-fields'

export default defineComponent({
  name: 'PostList',

  computed: {
    ...mapFields(['messages'])
  }

})
</script>
