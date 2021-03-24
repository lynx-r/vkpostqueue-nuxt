import { NuxtHTTPInstance } from '@nuxt/http'

// Nuxt 2.9+
declare module '@nuxt/types' {

  interface Context {
    $http: NuxtHTTPInstance
  }
}
