<template>
  <div>
    <ValidationObserver v-slot="{invalid}" ref="form">
      <div class="flex space-x-4">
        <div class="flex flex-col flex space-y-4 w-1/2">
          <PostTimer />
          <PostText />
        </div>
        <PostAttachment class="w-1/2" />
      </div>
      <div class="mt-4">
        <Button :disabled="invalid" @click="$emit('queuePost')">
          Поставить в очередь
        </Button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">

export default {
  name: 'PostForm'

}
</script>
