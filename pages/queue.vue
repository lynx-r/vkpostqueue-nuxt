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
      const isEdit = this.isEdit
      if (isEdit) {
        const params = { messageId: this.editMessageId as number, silent: true }
        this.$vkService.removePost(params)
        this.$store.commit('setEditMessage', null)
      }

      const date = this.date as string
      const time = this.time as string
      const text = this.text as string
      const images: File[] = this.images as File[]

      const postOnDate = this.$utils.formatDateAndTimeISO(date, time)
      this.$vkService.queuePost({
        images, postOnDate, text, silent: isEdit
      })
      if (isEdit) {
        this.$toast.success(this.$const.NEWS_RENAMED)
      }
    },

    onCreate () {
      this.$store.commit('post/resetForm')
      this.$store.commit('setEditMessage', null)
    },

    onRemove (messageId: number) {
      this.$vkService.removePost({ messageId })
    },

    async onEdit (messageId: number) {
      await this.$vkService.getPost(messageId)
    }
  }
})
</script>
