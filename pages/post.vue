<template>
  <div class="container">
    <CreatePost/>
  </div>
</template>

<script>
import CreatePost from '~/components/CreatePost';

export default {
  middleware: 'auth',
  components: {
    CreatePost,
  },
}
</script>

<style>
</style>
