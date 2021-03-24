<template>
  <div class="container">
    <CreatePost/>
  </div>
</template>

<script>
import CreatePost from '~/components/CreatePost';
import Logo from '~/components/Logo.vue'

export default {
  middleware: 'auth',
  components: {
    CreatePost,
  },
}
</script>

<style>
</style>
