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

function urlBase64ToUint8Array (base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default defineComponent({
  name: 'Home',

  methods: {
    async onRegisterSw () {
      if ('serviceWorker' in navigator) {
        const register = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        })

        const subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(this.$config.publicVapidKey)
        })
        await this.$http.post('/api/subscribe', { subscription })
      } else {
        console.error('Service workers are not supported in this browser')
      }
    }
  }
})
</script>
