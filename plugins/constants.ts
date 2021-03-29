import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import * as c from './config-constants'

export default defineNuxtPlugin((_, inject) => {
  inject('const', c)
})
