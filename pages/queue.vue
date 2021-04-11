<template>
  <div class="container flex space-x-4">
    <PostList class="w-1/2" @edit="onEdit" @remove="onRemove" />
    <PostForm class="w-1/2" :is-edit="isEdit" @createPost="onCreate" @queuePost="onQueuePost" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { mapFields } from 'vuex-map-fields'

export default defineComponent({
  name: 'Queue',
  middleware: 'auth',

  computed: {
    isEdit () {
      return !!this.editMessageId
    },

    ...mapFields('post', ['text', 'date', 'time', 'images']),
    ...mapFields(['editMessageId'])
  },

  methods: {
    onQueuePost () {
      if (this.isEdit) {
        this.$vkService.removePost(this.editMessageId as number)
        this.$store.commit('setEditMessage', null)
      }

      const date: string = this.date as string
      const time: string = this.time as string
      const text: string = this.text as string
      const images: File[] = this.images as File[]

      const postOnDate = this.$utils.formatDateAndTimeISO(date, time)
      this.$vkService.queuePost({
        images, postOnDate, text
      })
    },

    onCreate () {
      this.$store.commit('post/resetForm')
      this.$store.commit('setEditMessage', null)
    },

    onRemove (messageId: number) {
      this.$vkService.removePost(messageId)
    },

    async onEdit (messageId: number) {
      await this.$vkService.getPost(messageId)
    }
  }
})
</script>
