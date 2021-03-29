import Vue from 'vue'
import { joinURL, normalizeURL, withQuery } from 'ufo'

import {
  getMatchedComponents,
  promisify
} from './utils.js'

import { createApp } from './index.js'
import NuxtLink from './components/nuxt-link.server.js' // should be included after ./index.js

// Component: <NuxtLink>
Vue.component(NuxtLink.name, NuxtLink)

const noopApp = () => new Vue({ render: h => h('div', { domProps: { id: '__nuxt' } }) })

const createNext = ssrContext => (opts) => {
  // If static target, render on client-side
  ssrContext.redirected = opts
  if (ssrContext.target === 'static' || !ssrContext.res) {
    ssrContext.nuxt.serverRendered = false
    return
  }
  let fullPath = withQuery(opts.path, opts.query)
  const $config = ssrContext.runtimeConfig || {}
  const routerBase = ($config.app && $config.app.basePath) || '/'
  if (!fullPath.startsWith('http') && (routerBase !== '/' && !fullPath.startsWith(routerBase))) {
    fullPath = joinURL(routerBase, fullPath)
  }
  // Avoid loop redirect
  if (decodeURI(fullPath) === decodeURI(ssrContext.url)) {
    ssrContext.redirected = false
    return
  }
  ssrContext.res.writeHead(opts.status, {
    Location: normalizeURL(fullPath)
  })
  ssrContext.res.end()
}

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default async (ssrContext) => {
  // Create ssrContext.next for simulate next() of beforeEach() when wanted to redirect
  ssrContext.redirected = false
  ssrContext.next = createNext(ssrContext)
  // Used for beforeNuxtRender({ Components, nuxtState })
  ssrContext.beforeRenderFns = []
  // Nuxt object (window.{{globals.context}}, defaults to window.__NUXT__)
  ssrContext.nuxt = { data: [], error: null, state: null, serverRendered: true, routePath: '' }

  // Remove query from url is static target

  // Public runtime config
  ssrContext.nuxt.config = ssrContext.runtimeConfig.public
  if (ssrContext.nuxt.config.app) {
    __webpack_public_path__ = joinURL(ssrContext.nuxt.config.app.cdnURL, ssrContext.nuxt.config.app.assetsPath)
  }
  // Create the app definition and the instance (created for each request)
const { app, router, store } = await createApp(ssrContext, ssrContext.runtimeConfig.private)
  const _app = new Vue(app)
  // Add ssr route path to nuxt context so we can account for page navigation between ssr and csr
  ssrContext.nuxt.routePath = app.context.route.path

  const beforeRender = async () => {
    // Call beforeNuxtRender() methods
    await Promise.all(ssrContext.beforeRenderFns.map(fn => promisify(fn, { Components, nuxtState: ssrContext.nuxt })))

    ssrContext.rendered = () => {
      // Add the state from the vuex store
      ssrContext.nuxt.state = store.state
    }
  }

  const renderErrorPage = async () => {
    // Don't server-render the page in static target
    if (ssrContext.target === 'static') {
      ssrContext.nuxt.serverRendered = false
    }

    await beforeRender()
    return _app
  }
  const render404Page = () => {
    app.context.error({ statusCode: 404, path: ssrContext.url, message: 'This page could not be found' })
    return renderErrorPage()
  }

  // Components are already resolved by setContext -> getRouteData (app/utils.js)
  const Components = getMatchedComponents(router.match(ssrContext.url))

  /*
  ** Dispatch store nuxtServerInit
  */
  if (store._actions && store._actions.nuxtServerInit) {
    try {
      await store.dispatch('nuxtServerInit', app.context)
    } catch (err) {
      console.debug('Error occurred when calling nuxtServerInit: ', err.message)// eslint-disable-line no-console
      throw err
    }
  }
  // ...If there is a redirect or an error, stop the process
  if (ssrContext.redirected) {
    return noopApp()
  }
  if (ssrContext.nuxt.error) {
    return renderErrorPage()
  }

  // If no Components found, returns 404
  if (!Components.length) {
    return render404Page()
  }

  // ...If there is a redirect or an error, stop the process
  if (ssrContext.redirected) {
    return noopApp()
  }
  if (ssrContext.nuxt.error) {
    return renderErrorPage()
  }

  // Call beforeNuxtRender methods & add store state
  await beforeRender()

  return _app
}
