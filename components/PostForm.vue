<template>
  <div>
    <div class="flex space-x-4">
      <PostText class="w-1/2"/>
      <PostAttachment class="w-1/2"/>
    </div>
    <div class="flex space-x-4">
      <button class="bg-blue-300 rounded px-4" @click="uploadPost">Поставить в очередь</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { mapFields } from 'vuex-map-fields'
import PostText from '~/components/PostText.vue'
import PostAttachment from './PostAttachment.vue'

export default defineComponent({
  name: 'PostForm',
  props: [],
  components: {
    PostText,
    PostAttachment
  },
  setup() {
    return {}
  },

  methods: {
    async uploadPost() {
      console.log('upload')
      try {
        const postOnDate = this.date + '_' + this.time
        let putParams = {message: this.message, name: this.topic, postOnDate}
        console.log(putParams)
        const res = await this.$http.post('/api/queueNews', putParams)
        console.log(await res.json())

        for (const image of this.images as File[]) {
          const urlParams = {name: image.name, postOnDate, method: 'put'}
          let res = await this.$http.post('/api/generatePresignedUrl', urlParams)
          const {payload: {url}} = await res.json()
          console.log(url)
          res = await this.$http.put(url, image)
          console.log(res)
        }
      } catch (err) {
        console.log('Error', err)
      }
    }
  },

  computed: {
    ...mapFields('post', ['topic', 'message', 'date', 'time', 'images'],)
  }
})
</script>

<style scoped>

</style>
