<template>
  <div>
    <div v-if="images.length" class="mb-4">
      <ul>
        <li v-for="img of images">
          {{ img.name }}
        </li>
      </ul>
      <Button @click="clearImages" color="bg-red-200">Очистить</Button>
    </div>
    <div>
      <div>Прикрепите изображение</div>
      <input ref="fileUpload" type="file" class="bg-blue-300 rounded p-2 shadow"
             multiple @change="imageUploaded($event.target.files)">
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
