<template>
  <div class="space-y-4">
    <div class="flex flex-col justify-start">
      <span class="w-min min-w-max">Введите запись на стену</span>
      <textarea v-model="message" class="rounded h-40" />
    </div>
    <div class="flex space-x-4">
      <div class="w-1/2">
        <span class="w-min min-w-max">Дата поста</span>
        <input v-model="date" type="date" class="rounded w-full">
      </div>
      <div class="w-1/2">
        <span class="w-min min-w-max">Время поста</span>
        <input v-model="time" type="time" class="rounded w-full">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'PostText',

  computed: {
    ...mapFields('post', ['message', 'date', 'time'])
  }
}
</script>
