<template>
  <div>
    <div v-if="images.length" class="mb-4">
      <ul>
        <li v-for="img of images" :key="img.name">
          {{ img.name }}
        </li>
      </ul>
      <Button color="bg-red-200" @click="clearImages">
        Очистить
      </Button>
    </div>
    <div>
      <div>Прикрепите изображение</div>
      <input
        ref="fileUpload"
        type="file"
        class="bg-blue-300 rounded p-2 shadow"
        multiple
        @change="imageUploaded($event.target.files)"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { mapFields } from 'vuex-map-fields'

export default defineComponent({
  name: 'PostAttachment',

  computed: {
    ...mapFields('post', ['images'])
  },

  methods: {
    imageUploaded (files: File[]) {
      this.$accessor.post.setImages(files)
    },

    clearImages () {
      this.$accessor.post.setImages([]);
      (this.$refs.fileUpload as HTMLInputElement).value = ''
    }
  }

})
</script>
