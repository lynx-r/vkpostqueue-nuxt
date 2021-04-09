import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { StoredDocs } from './model'
import { storedDocsToPostMessages } from './utils/utils'
import { vkServiceFactory } from '~/plugins/vk-service'

export default defineNuxtPlugin((ctx, inject) => {
  const { $ctxUtils, store } = ctx

  const docs: StoredDocs = $ctxUtils.getUserPosts()
  const messages = storedDocsToPostMessages(docs)
  store.commit('setMessages', messages)

  inject('vkService', vkServiceFactory(ctx))
})
