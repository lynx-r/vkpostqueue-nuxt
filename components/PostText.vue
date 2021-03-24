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
      <button class="bg-blue-300 rounded px-4" @click="uploadPost">Поставить в очередь</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
// import { useStorage } from 'vue3-storage'

export default defineComponent({
  name: 'PostText',

  setup: () => {
    const {$http, $dateFns} = useContext()

    const date = ref($dateFns.format(new Date(), 'yyyy-MM-dd'))
    const time = ref($dateFns.format(new Date(), 'HH:mm'))
    const topic = ref('test test')
    const message = ref('test')

    const uploadPost = async () => {
      console.log('upload')
      try {
        const postOnDate = date.value + '_' + time.value
        let putParams = {news: message.value, topic: topic.value, postOnDate}
        console.log(putParams)
        const res = await $http.post('/api/queueNews', putParams)
        console.log(await res.json())
      } catch (err) {
        console.log('Error', err)
      }
    }

    return {uploadPost, date, time, topic, message}
  }
})
</script>

<style scoped>
</style>
