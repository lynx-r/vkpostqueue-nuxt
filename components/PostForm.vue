<template>
  <div>
    <PostText/>
    <PostAttachment/>
  </div>
</template>

<script lang="ts">
import { defineNuxtConfig } from '@nuxtjs/composition-api'
import PostText from '~/components/PostText.vue'
import PostAttachment from '~/components/PostAttachment.vue'

export default defineNuxtConfig({
  name: 'PostForm',
  props: [],
  components: {
    PostText,
    PostAttachment
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>

</style>
