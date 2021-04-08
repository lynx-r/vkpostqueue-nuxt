import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import * as utils from './utils'

export default defineNuxtPlugin((_, inject) => {
  inject('utils', utils)
})
