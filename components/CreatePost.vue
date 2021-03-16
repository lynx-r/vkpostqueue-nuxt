<template>
  <div class="space-y-4 w-1/2 mb-4">
    <div class="shadow flex flex-col justify-start p-6">
      <span class="w-min min-w-max">Введите запись на стену</span>
      <textarea class="rounded text-pink-500 h-40" v-model="message"/>
    </div>
    <div class="shadow flex space-x-4 p-6">
      <div class="w-1/2">
        <span class="w-min min-w-max">Дата поста</span>
        <input type="date" class="rounded text-pink-500 w-full" v-model="date"/>
      </div>
      <div class="w-1/2">
        <span class="w-min min-w-max">Время поста</span>
        <input type="time" class="rounded text-pink-500 w-full" v-model="time"/>
      </div>
    </div>
    <div class="flex space-x-4">
      <button class="bg-blue-300 rounded px-4" @click="upload">Поставить в очередь</button>
    </div>
  </div>
</template>

<script lang="ts">
import { NuxtConfig } from '@nuxt/types'
import { defineNuxtConfig, useContext, useStore, computed } from '@nuxtjs/composition-api'
import { mapMutations, mapGetters, mapActions } from 'vuex'

import { VKAPI } from 'vkontakte-api'
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
// import { useStorage } from 'vue3-storage'

export default defineNuxtConfig({
  name: 'CreatePost',
  props: {
    msg: {
      type: String,
      required: false
    }
  },

  data({ $dateFns }: NuxtConfig) {
    return {
      date: $dateFns.format(new Date(), 'yyyy-MM-dd'),
      time: $dateFns.format(new Date(), 'HH:mm'),
      message: 'test',
    }
  },

  setup: () => {
    const ctx = useContext()

    const {s3Bucket, vkGroupOwnerId} = ctx['$config']
    console.log(vkGroupOwnerId)
    return {vkApi: {}, s3Bucket, vkGroupOwnerId}
  },

  computed: {
    uploadMessage() {
      return `${this.date}_${this.time}/message.txt`
    },
  },

  methods: {

    async upload() {
      console.log('upload')
      try {
        let putParams = {Bucket: this.s3Bucket, Key: this.uploadMessage, Body: this.message}
        const res = await this.$http.post('/api/putPostToS3', putParams)
        console.log(res)
      } catch (err) {
        console.log('Error', err)
      }
    },

    async queue() {
      // await this.upload()
      try {
        // const text = await this.getText()
        // console.log("Success, bucket returned", text);
        // await this.postText()
      } catch (err) {
        console.log('Error', err)
      }

    },

    async postText() {
      // const u = await this.vkApi.users.get({userIds: ['1']})
      // console.log(u)
      // const res = await this.vkApi.wall.post({ownerId: '', message: 'test', fromGroup: true})
      // console.log(res)
    },

    async getText() {
      const data = await this.s3.send(new GetObjectCommand({Bucket: 'vk-post-queue', Key: 'file'}))
      // const reader: ReadableStreamDefaultReader = data.Body.getReader()
      // const uint8array = await reader.read()
      // return new TextDecoder().decode(uint8array.value)
      return ''
    },

    ...mapActions(['sendToS3'])
  }
})
</script>

<style scoped>
</style>
