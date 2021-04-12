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

export default defineComponent({
  name: 'Home',

  methods: {
    async onRegisterSw () {
      if ('serviceWorker' in navigator) {
        const register = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        })

        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data === this.$config.checkPostQueue) {
            this.$vkService.processQueue()
          }
        })

        const subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.$config.publicVapidKey
        })
        const userId = this.$ctxUtils.getUserId()
        await this.$http.post('/api/subscribe', { subscription, userId })
      }
    }
  }
})
</script>
