<template>
  <div>
    <div>
      <span v-for="img of images">
        {{img.name}}
      </span>
    </div>
    <div>
      <div>Прикрепите изображение</div>
      <input type="file" multiple @change="imageUploaded($event.target)">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { mapFields } from 'vuex-map-fields'

export default defineComponent({
  name: 'PostAttachment',
  props: [],
  setup() {
    return {}
  },

  methods: {
    async imageUploaded(input: HTMLInputElement) {
      console.log(input.name)
      if (input.files?.length) {
        this.$store.commit('post/setImages', input.files)
      }
    }
  },

  computed: {
    ...mapFields('post', ['images'])
  }
})
</script>

<style scoped>

</style>
