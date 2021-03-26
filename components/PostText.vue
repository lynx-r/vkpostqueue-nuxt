<template>
  <div class="space-y-4">
    <div class="shadow flex flex-col justify-start p-6">
      <span class="w-min min-w-max">Введите тему новости</span>
      <input type="text" class="rounded text-pink-500" v-model="topic"/>
    </div>
    <div class="shadow flex flex-col justify-start p-6">
      <span class="w-min min-w-max">Введите запись на стену</span>
      <textarea class="rounded text-pink-500 h-40" v-model="message"/>
    </div>
    <div class="shadow flex space-x-4 p-6">
      <div class="w-1/2">
        <span class="w-min min-w-max">Дата поста</span>
        <input type="date" class="rounded text-pink-500 w-full" v-model="date"/>
      </div>
      <div class="w-1/2">
        <span class="w-min min-w-max">Время поста</span>
        <input type="time" class="rounded text-pink-500 w-full" v-model="time"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'PostText',

  computed: {
    ...mapFields('post', ['topic', 'message', 'date', 'time'])
  }
}
</script>

<style scoped>
</style>
