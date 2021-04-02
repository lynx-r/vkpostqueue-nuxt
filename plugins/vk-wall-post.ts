import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { queuePost } from './vk-service'
import { VkWallPostParams } from '~/plugins/model'

export default defineNuxtPlugin((ctx, inject) => {
  inject('queuePost', (params: VkWallPostParams) => queuePost(ctx, params))
})
