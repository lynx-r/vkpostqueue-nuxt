import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import * as constants from './config-constants'

export default defineNuxtPlugin((_, inject) => {
  inject('const', constants)
})
