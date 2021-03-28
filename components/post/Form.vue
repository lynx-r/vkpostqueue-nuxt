<template>
  <div>
    <div class="flex space-x-4">
      <PostText class="w-1/2" />
      <PostAttachment class="w-1/2" />
    </div>
    <div class="mt-4">
      <Button @click="$emit('queuePost')">
        Поставить в очередь
      </Button>
    </div>
  </div>
</template>
