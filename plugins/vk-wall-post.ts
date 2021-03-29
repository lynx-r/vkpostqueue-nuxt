import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { USER_ID } from '~/constants'

const saveMessage = (message: string) => {
  console.log(message)
}

export default defineNuxtPlugin(({ $storage }, inject) => {
  console.log($storage.getUniversal(USER_ID))
  inject('saveMessage', saveMessage)
})
