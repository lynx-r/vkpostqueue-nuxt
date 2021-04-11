import { contextUtilsFactory } from '~/plugins/utils/contextUtils'
import { vkServiceFactory } from '~/plugins/vk-service'
import { accessorType } from '~/store'
import * as constants from '~/plugins/config-constants'
import * as utils from '~/plugins/utils/utils'

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accessorType
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
    $accessor: typeof accessorType
    $utils: typeof utils
    $ctxUtils: ReturnType<typeof contextUtilsFactory>
  }
}

declare module 'connect' {
  interface IncomingMessage {
    body: object
  }
}
