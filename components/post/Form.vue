<template>
  <ValidationObserver v-slot="{handleSubmit, invalid}" class="container">
    <form
      class="flex flex-col flex space-y-4"
      @submit.prevent="handleSubmit(onSubmit)"
    >
      <PostTimer />
      <PostText />
      <PostAttachment />
      <Button :disabled="invalid">
        Поставить в очередь
      </Button>
    </form>
  </ValidationObserver>
</template>

<script lang="ts">

import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PostForm',

  methods: {
    onSubmit () {
      this.$emit('queuePost')
    }
  }
})
</script>
