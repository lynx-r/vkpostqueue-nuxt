<template>
  <div>
    <div>
      <span v-for="img of images">
        {{ img.name }}
      </span>
    </div>
    <button v-if="images.length" @click="clearImages">Очистить</button>
    <div>
      <div>Прикрепите изображение</div>
      <input ref="fileUpload" type="file" multiple @change="imageUploaded($event.target.files)">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { mapFields } from 'vuex-map-fields'

export default defineComponent({
  name: 'PostAttachment',

  methods: {
    async imageUploaded(files: File[]) {
      this.$accessor.post.setImages(files)
    },

    clearImages() {
      this.$accessor.post.setImages([]);
      (this.$refs.fileUpload as HTMLInputElement).value = ''
    }
  },

  computed: {
    ...mapFields('post', ['images'])
  }
})
</script>
