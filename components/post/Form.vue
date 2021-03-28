<template>
  <div>
    <div class="flex space-x-4">
      <div class="flex flex-col flex space-y-4 w-1/2">
        <PostTimer />
        <PostText />
      </div>
      <PostAttachment class="w-1/2" />
    </div>
    <div class="mt-4">
      <Button @click="$emit('queuePost')">
        Поставить в очередь
      </Button>
    </div>
  </div>
</template>
