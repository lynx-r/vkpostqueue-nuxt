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

        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data.action === 'processQueue') {
            this.$vkService.processQueue()
          }
        })

        const subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.$config.publicVapidKey
        })
        await this.$http.post('/api/subscribe', { subscription })
      }
    }
  }
})
</script>
