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
      <button class="bg-blue-300 rounded px-4" @click="queue">Поставить в очередь</button>
    </div>
  </div>
</template>

<script lang="ts">
import { VKAPI } from 'vkontakte-api'

// import { useStorage } from 'vue3-storage'

export default {
  name: 'CreatePost',
  props: {
    msg: {
      type: String,
      required: false
    }
  },

  data() {
    return {
      message: '',
      date: '',
      time: ''
    }
  },
  setup: () => {
    const vkApi = new VKAPI({
      isBrowser: true,
      accessToken: ''
    })
    // const storage = useStorage()
    // storage?.setStorageSync('msg', 'hi')
    return {vkApi}
  },

  computed: {
    uploadMessage() {
      return `${this.date}_${this.time}/message.txt`
    }
  },

  methods: {
    async upload() {
      console.log('upload')
      try {
        // todo service workers ?
        console.log('Success')
      } catch (err) {
        console.log('Error', err)
      }
    },

    async queue() {
      await this.upload()
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
      const res = await this.vkApi.wall.post({ownerId: '-203255283', message: 'test', fromGroup: true})
      console.log(res)
    },

    async getText() {
      return ''
    },

  }
}
</script>

<style scoped>
</style>
