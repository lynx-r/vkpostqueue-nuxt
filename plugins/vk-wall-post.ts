import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { queuePost } from './vk-service'
import { StoredDocs, VkWallPostParams } from '~/plugins/model'
import { storedDocsToPostMessages } from '~/plugins/utils/utils'

export default defineNuxtPlugin((ctx, inject) => {
  const { $storage, $const, store } = ctx
  const userId = $storage.getCookie($const.USER_ID_KEY)
  const docs: StoredDocs = $storage.getLocalStorage(userId)
  const messages = storedDocsToPostMessages(docs)
  store.commit('setMessages', messages)

  inject('queuePost', (params: VkWallPostParams) => queuePost(ctx, params))
})
