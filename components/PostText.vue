<template>
  <div class="space-y-4 w-1/2 mb-4">
    <div class="shadow flex flex-col justify-start p-6">
      <span class="w-min min-w-max">Введите тему новости</span>
      <input type="text" class="rounded text-pink-500" v-model="topic"/>
    </div>
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
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { NuxtConfig } from '@nuxt/types'
import { defineNuxtConfig, useContext } from '@nuxtjs/composition-api'
import { mapActions } from 'vuex'
// import { useStorage } from 'vue3-storage'

export default defineNuxtConfig({
  name: 'CreatePost',
  props: {
    msg: {
      type: String,
      required: false
    }
  },

  data({$dateFns}: NuxtConfig) {
    return {
      date: $dateFns.format(new Date(), 'yyyy-MM-dd'),
      time: $dateFns.format(new Date(), 'HH:mm'),
      topic: 'test post',
      message: 'test',
    }
  },

  setup: () => {
  },

  computed: {},

  methods: {

    async upload() {
      console.log('upload')
      try {
        const postOnDate = this.date + '_' + this.time
        console.log(postOnDate)
        let putParams = {news: this.message, topic: this.topic, postOnDate}
        const res = await this.$http.post('/api/queueNews', putParams)
        console.log(res)
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

  }
})
</script>

<style scoped>
</style>
