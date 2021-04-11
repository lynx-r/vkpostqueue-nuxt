<template>
  <div class="flex flex-col space-y-2">
    <FileUpload
      ref="fileUpload"
      rules="required|mimes:image/jpg,image/png,image/gif"
      label="Прикрепить изображение"
      @change="imageUploaded"
    />
    <div v-if="images.length">
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

  computed: {
    ...mapFields('post', ['images'])
  },

  watch: {
    images (val, oldVal) {
      if (!_.isEmpty(oldVal) && _.isEmpty(val)) {
        (this.$refs.fileUpload as any).resetInput()
      } else if (_.isEqual(oldVal, val)) {
        console.log(val, oldVal)
      }
    }
  },

  methods: {
    imageUploaded (files: FileList) {
      this.$accessor.post.setImages(files)
    },

    clearImages () {
      this.$accessor.post.setImages([]);
      // https://vee-validate.logaretm.com/v3/api/validation-provider.html#methods
      (this.$refs.fileUpload as any).resetInput()
    }
  }
})
</script>
