<template>
  <div>
    <PostText/>
    <PostAttachment/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import PostText from '~/components/PostText.vue'
import PostAttachment from './PostAttachment.vue'

export default defineComponent({
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
