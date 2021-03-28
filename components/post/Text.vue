<template>
  <div class="space-y-4">
    <div class="flex flex-col justify-start">
      <span class="w-min min-w-max">Введите запись на стену</span>
      <textarea v-model="message" class="rounded h-40" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { mapFields } from 'vuex-map-fields'

export default defineComponent({
  name: 'PostText',

  computed: {
    ...mapFields('post', ['message'])
  }

})
</script>
