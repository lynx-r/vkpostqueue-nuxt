<template>
  <div class="h-96">
    <Textarea v-model="text" label="Введите запись на стену" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { mapFields } from 'vuex-map-fields'

export default defineComponent({
  name: 'PostText',

  computed: {
    ...mapFields('post', ['text'])
  }
})
</script>
