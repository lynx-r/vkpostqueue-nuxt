import { accessorType } from '~/store'
import * as c from '~/plugins/config-constants'

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accessorType
    $const: typeof c
  }

  interface VueConstructor {
    __post_mixin__: boolean
  }
}

declare module 'vuex' {

}

declare module '@nuxt/types' {

  interface NuxtAppOptions {
    $accessor: typeof accessorType
  }

  interface Context {
    $const: typeof c
  }
}
