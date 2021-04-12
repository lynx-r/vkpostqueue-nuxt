import * as constants from '~/plugins/config-constants'
import { contextUtilsFactory } from '~/plugins/utils/contextUtils'
import * as utils from '~/plugins/utils/utils'
import { vkServiceFactory } from '~/plugins/vk-service'

declare module 'vue/types/vue' {
  interface Vue {
    $const: typeof constants
    $utils: typeof utils
    $ctxUtils: ReturnType<typeof contextUtilsFactory>
    $vkService: ReturnType<typeof vkServiceFactory>
  }
}

declare module 'vuex' {
  interface ActionContext<S, R> {
    $const: typeof constants
    $utils: typeof utils
    $ctxUtils: ReturnType<typeof contextUtilsFactory>
  }
}

declare module '@nuxt/types' {

  interface Context {
    $const: typeof constants
    $utils: typeof utils
    $ctxUtils: ReturnType<typeof contextUtilsFactory>
  }
}

declare module 'connect' {
  interface IncomingMessage {
    body: object
  }
}
