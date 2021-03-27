<template>
  <div>
    <div class="flex space-x-4">
      <PostText class="w-1/2"/>
      <PostAttachment class="w-1/2"/>
    </div>
    <div class="flex space-x-4">
      <button class="bg-blue-300 rounded px-4"
              @click="$emit('queuePost')"
      >
        Поставить в очередь
      </button>
    </div>
  </div>
</template>
