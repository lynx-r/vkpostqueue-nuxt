<template>
  <div>
    <FileUpload
      ref="fileUpload"
      :reset-input-flag="resetFileInputFlag"
      rules="required|mimes:image/jpg,image/png,image/gif"
      label="Прикрепить изображение"
      @change="imageUploaded"
    />
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import _ from 'lodash'
import { mapFields } from 'vuex-map-fields'

export default defineComponent({
  name: 'PostAttachment',

  data () {
    return {
      resetFileInputFlag: false
    }
  },

  computed: {
    ...mapFields('post', ['images'])
  },

  methods: {
    imageUploaded (files: FileList) {
      this.$accessor.post.setImages(files)
    },

    clearImages () {
      this.$accessor.post.setImages([])
      this.$refs.fileUpload.resetInput()
    }
  }
})
</script>
