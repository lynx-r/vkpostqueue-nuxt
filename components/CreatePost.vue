<template>
  <div class="space-y-4 w-1/2 mb-4">
<!--    <p v-if="$fetchState.pending">Fetching mountains...</p>-->
<!--    <p v-else-if="$fetchState.error">An error occurred :(</p>-->
<!--    <ul>-->
<!--      <li v-for="todo in todos" :key="todo.text">-->
<!--        <input :checked="todo.done" @change="toggle(todo)" type="checkbox">-->
<!--        <span :class="{ done: todo.done }">{{ todo.text }}</span>-->
<!--      </li>-->
<!--      <li><input @keyup.enter="addTodo" placeholder="What needs to be done?"></li>-->
<!--    </ul>-->
    <div class="shadow flex flex-col justify-start p-6">
      <span class="w-min min-w-max">Введите запись на стену</span>
      <textarea class="rounded text-pink-500 h-40" />
    </div>
    <div class="shadow flex space-x-4 p-6">
      <div class="w-1/2">
        <span class="w-min min-w-max">Дата поста</span>
        <input type="date" class="rounded text-pink-500 w-full"/>
      </div>
      <div class="w-1/2">
        <span class="w-min min-w-max">Время поста</span>
        <input type="time" class="rounded text-pink-500 w-full"/>
      </div>
    </div>
    <div class="flex space-x-4">
      <button class="bg-blue-300 rounded px-4" @click="upload">Поставить в очередь</button>
    </div>
  </div>
</template>

<script lang="ts">
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

  data() {
    return {
      message: 'test',
      date: '',
      time: '',
      post: {}
    }
  },

  setup: (p) => {
    const ctx = useContext()

    const {s3Bucket} = ctx.$config
    // const vkApi = new VKAPI({
    //   isBrowser: true,
    //   accessToken: ''
    // })
    // const s3 = new S3Client({
    //   credentials: {
    //     accessKeyId: s3AccessKeyId,
    //     secretAccessKey: s3SecretAccessKey
    //   }, region: s3Region
    // })

    // const storage = useStorage()
    // storage?.setStorageSync('msg', 'hi')
    return {vkApi: {}, s3Bucket}
  },

  computed: {
    uploadMessage() {
      return `${this.date}_${this.time}/message.txt`
    },

    cnt() {
      return this.$store.getters.cnt
    },

    todos () {
      return this.$store.state.todos.list
    },
  },

  methods: {

    addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    async upload() {
      console.log('upload')
      try {
        // todo service workers ?
        let putParams = {Bucket: this.s3Bucket, Key: this.uploadMessage, Body: this.message}
        this.sendToS3(putParams)
        // console.log(this.$store.state.s3Client.send(1))
        // console.log(this.s3.send)
        // console.log(this.counter)
        // const data =  this.s3Client.send(new PutObjectCommand(putParams))
        // console.log('Success', data)
      } catch (err) {
        console.log('Error', err)
      }
    },

    async queue(ctx) {
      // await this.upload()
      try {
        // const text = await this.getText()
        // console.log("Success, bucket returned", text);
        // await this.postText()
      } catch (err) {
        console.log('Error', err)
      }

    },

    async postText({$config}) {
      console.log($config)
      // const u = await this.vkApi.users.get({userIds: ['1']})
      // console.log(u)
      // const res = await this.vkApi.wall.post({ownerId: '-203255283', message: 'test', fromGroup: true})
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
