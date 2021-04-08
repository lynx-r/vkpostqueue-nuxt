import { accessorType } from '~/store'
import * as constants from '~/plugins/config-constants'
import * as utils from '~/plugins/utils/utils'

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accessorType
    $const: typeof constants
    $utils: typeof utils
  }
}

declare module 'vuex' {
  interface ActionContext<S, R> {
    $const: typeof constants
    $utils: typeof utils
  }
}

declare module '@nuxt/types' {

  interface Context {
    $const: typeof constants
    $accessor: typeof accessorType
    $utils: typeof utils
  }
}
