import Vue from 'vue'
import { decode, parsePath, withoutBase, withoutTrailingSlash, normalizeURL } from 'ufo'

import NuxtError from './components/nuxt-error.vue'

export default {
  render (h, props) {
    const templateEl = h('nuxt')

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [

      templateEl
    ])
  },

  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    this.$root.$options.$nuxt = this

    if (process.client) {
      // add to window so we can listen when ready
      window.$nuxt = this
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
    // Add $nuxt.context
    this.context = this.$options.context
  },

  watch: {
    'nuxt.err': 'errorChanged'
  },

  methods: {
    /* eslint-disable comma-dangle */

    async refresh () {
    },
    errorChanged () {
      if (this.nuxt.err) {
        let errorLayout = (NuxtError.options || NuxtError).layout;

        if (typeof errorLayout === 'function') {
          errorLayout = errorLayout(this.context)
        }

        this.setLayout(errorLayout)
      }
    },
  },

  /* eslint-enable comma-dangle */
}
