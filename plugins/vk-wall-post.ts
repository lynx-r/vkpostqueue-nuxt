import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { StoredDocs } from './model'
import { storedDocsToPostMessages } from './utils/utils'
import { vkServiceFactory } from '~/plugins/vk-service'

export default defineNuxtPlugin((ctx, inject) => {
  const { $storage, $ctxUtils, store } = ctx
  const userId = $ctxUtils.getUserId()
  const docs: StoredDocs = $storage.getLocalStorage(userId)
  const messages = storedDocsToPostMessages(docs)
  store.commit('setMessages', messages)

  inject('vkService', vkServiceFactory(ctx))
})
