<template>
  <div class="container">
    <PostForm/>
  </div>
</template>

<script>
import PostForm from '~/components/PostForm.vue';

export default {
  middleware: 'auth',
  components: {
    PostForm,
  },

  provide() {
    return {
      userId: this.$storage.getUniversal('userId')
    }
  },
}
</script>

<style>
</style>
