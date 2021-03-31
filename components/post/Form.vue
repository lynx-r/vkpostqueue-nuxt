<template>
  <div>
    <ValidationObserver v-slot="{handleSubmit, invalid}" ref="form">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <div class="flex space-x-4">
          <div class="flex flex-col flex space-y-4 w-1/2">
            <PostTimer />
            <PostText />
          </div>
          <PostAttachment class="w-1/2" />
        </div>
        <div class="mt-4">
          <Button :disabled="invalid">
            Поставить в очередь
          </Button>
        </div>
      </form>
    </ValidationObserver>
  </div>
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
