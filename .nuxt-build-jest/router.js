import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'// eslint-disable-line no-unused-vars
import scrollBehavior from './router.scrollBehavior.js'

const _2d649e48 = () => interopDefault(import('../pages/auth.vue' /* webpackChunkName: "pages/auth" */))
const _65e48757 = () => interopDefault(import('../pages/post/index.vue' /* webpackChunkName: "pages/post/index" */))
const _4bba0829 = () => interopDefault(import('../pages/RedirectToVkAuthorization.vue' /* webpackChunkName: "pages/RedirectToVkAuthorization" */))
const _3ca1aa32 = () => interopDefault(import('../pages/VkAuthError.vue' /* webpackChunkName: "pages/VkAuthError" */))
const _55dc2150 = () => interopDefault(import('../pages/VkAuthorizationSuccessCallback.vue' /* webpackChunkName: "pages/VkAuthorizationSuccessCallback" */))
const _7e60ae47 = () => interopDefault(import('../pages/post/create.vue' /* webpackChunkName: "pages/post/create" */))
const _7e45ada9 = () => interopDefault(import('../pages/post/list.vue' /* webpackChunkName: "pages/post/list" */))
const _8858fd64 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,
  /* eslint-disable array-bracket-spacing, quotes, quote-props, object-curly-spacing, key-spacing */
  routes: [{
    path: "/auth",
    component: _2d649e48,
    name: "auth"
  }, {
    path: "/post",
    component: _65e48757,
    name: "post"
  }, {
    path: "/RedirectToVkAuthorization",
    component: _4bba0829,
    name: "RedirectToVkAuthorization"
  }, {
    path: "/VkAuthError",
    component: _3ca1aa32,
    name: "VkAuthError"
  }, {
    path: "/VkAuthorizationSuccessCallback",
    component: _55dc2150,
    name: "VkAuthorizationSuccessCallback"
  }, {
    path: "/post/create",
    component: _7e60ae47,
    name: "post-create"
  }, {
    path: "/post/list",
    component: _7e45ada9,
    name: "post-list"
  }, {
    path: "/",
    component: _8858fd64,
    name: "index"
  }],
  /* eslint-enable array-bracket-spacing, quotes, quote-props, object-curly-spacing, key-spacing */

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
