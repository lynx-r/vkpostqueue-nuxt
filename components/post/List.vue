<template>
  <div class="container">
    <ul>
      <li v-for="message in messages" :key="message.id">
        <PostListItem :message="message" @remove="onRemove($event)" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { mapFields } from 'vuex-map-fields'

export default defineComponent({
  name: 'PostList',

  computed: {
    ...mapFields(['messages'])
  },

  methods: {
    onRemove (docId: number) {
      console.log(docId)
    }
  }

})
</script>
