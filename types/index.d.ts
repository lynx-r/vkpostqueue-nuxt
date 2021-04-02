import { accessorType } from '~/store'
import * as constants from '~/plugins/config-constants'

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accessorType
    $const: typeof constants
  }

  interface VueConstructor {
    __post_mixin__: boolean
  }
}

declare module 'vuex' {
  interface ActionContext<S, R> {
    $const: typeof constants
  }
}

declare module '@nuxt/types' {

  interface NuxtAppOptions {
    $accessor: typeof accessorType
  }

  interface Context {
    $const: typeof constants
  }
}
