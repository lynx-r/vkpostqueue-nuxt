import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { queuePost } from './vk-service'
import { storedDocsToPostMessages } from './utils/utils'
import { SavePostParams, StoredDocs } from './model'

export default defineNuxtPlugin((ctx, inject) => {
  const { $storage, $const, store } = ctx
  const userId = $storage.getCookie($const.USER_ID_KEY)
  const docs: StoredDocs = $storage.getLocalStorage(userId)
  const messages = storedDocsToPostMessages(docs)
  store.commit('setMessages', messages)

  inject('queuePost', (params: SavePostParams) => queuePost(ctx, params))
})
