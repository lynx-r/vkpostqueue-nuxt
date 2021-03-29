import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { saveMessage } from './vk-service'

export default defineNuxtPlugin((ctx, inject) => {
  inject('saveMessage', (message: string) => saveMessage(ctx, message))
})
