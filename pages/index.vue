<template>
  <div>
    <h1>Добро пожаловать!</h1>
    <div>
      <Button @click="onRegisterSw">
        Включить уведомления
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { VKAPI } from 'vkontakte-api'

export default defineComponent({
  name: 'Home',

  methods: {
    async onRegisterSw () {
      if ('serviceWorker' in navigator) {
        const register = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        })
        const accessToken = this.$ctxUtils.getAccessToken()
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({ accessToken })
          console.log(`This page is currently controlled by: ${navigator.serviceWorker.controller}`)
        } else {
          console.log('This page is not currently controlled by a service worker.')
        }

        //   const accessToken = this.$ctxUtils.getAccessToken()
      //   navigator.serviceWorker.addEventListener('message', (event) => {
      //     console.log('???', event.data.action)
      //     if (navigator.serviceWorker.controller) {
      //       navigator.serviceWorker.controller.postMessage({ accessToken })
      //       console.log(`This page is currently controlled by: ${navigator.serviceWorker.controller}`)
      //     } else {
      //       console.log('This page is not currently controlled by a service worker.')
      //     }
      //   })
      //
      //   const subscription = await register.pushManager.subscribe({
      //     userVisibleOnly: true,
      //     applicationServerKey: this.$config.publicVapidKey
      //   })
      //   await this.$http.post('/api/subscribe', { subscription })
      // } else {
      //   console.error('Service workers are not supported in this browser')
      }
    }
  }
})
</script>
