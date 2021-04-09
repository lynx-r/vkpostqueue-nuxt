import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import * as utils from './utils'
import { contextUtilsFactory } from '~/plugins/utils/contextUtils'

export default defineNuxtPlugin((ctx, inject) => {
  inject('utils', utils)
  inject('ctxUtils', contextUtilsFactory(ctx))
})
