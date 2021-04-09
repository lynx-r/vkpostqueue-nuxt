<template>
  <div class="container flex">
    <PostList class="w-1/2" @remove="onRemove" />
    <PostForm class="w-1/2" @queuePost="onQueuePost" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { mapFields } from 'vuex-map-fields'

export default defineComponent({
  name: 'Queue',
  middleware: 'auth',

  computed: {
    ...mapFields('post', ['text', 'date', 'time', 'images'])
  },

  methods: {
    onQueuePost () {
      const date: string = this.date as string
      const time: string = this.time as string
      const text: string = this.text as string
      const images: File[] = this.images as File[]

      const postOnDate = this.$utils.formatDatetimeISO(date, time)
      this.$vkService.queuePost({
        images, postOnDate, text
      })
    },

    onRemove (messageId: number) {
      this.$vkService.removePost(messageId)
    }
  }
})
</script>
