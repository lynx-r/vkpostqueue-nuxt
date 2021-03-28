<template>
  <div class="h-full">
    <div v-if="isShownAccessTokenForm" class="mb-4">
      <div>Скопируйте сюда URL из открывшейся вкладки</div>
      <input v-model="accessTokenUrl" type="text">
      <Button :disabled="!accessTokenUrl" @click="saveAccessToken">
        Сохранить "Ключ доступа"
      </Button>
    </div>
    <a
      :href="$config.vkAuthorizeUrl"
      target="_blank"
      class="bg-blue-300 w-72 block text-center rounded p-2 shadow"
      @click="showAccessTokenForm"
    >
      Авторизоваться в ВКонтакте
    </a>
  </div>
</template>

<script>
import { USER_ID } from '~/constants'

export default {
  name: 'Login',

  data () {
    return {
      accessTokenUrl: '',
      isShownAccessTokenForm: true
    }
  },

  methods: {
    showAccessTokenForm () {
      this.isShownAccessTokenForm = true
    },

    async saveAccessToken () {
      const gotToken = !!this.accessTokenUrl &&
          this.accessTokenUrl.includes('access_token') &&
          this.accessTokenUrl.includes('user_id') &&
          this.accessTokenUrl.includes('expires_in')
      if (!gotToken) {
        this.$toast.error('Не верный URL')
        this.accessTokenUrl = ''
        return
      }
      const accessToken = this.accessTokenUrl.match(/access_token=(\w+)/)[1]
      const userId = this.accessTokenUrl.match(/user_id=(\w+)/)[1]
      const expiresIn = this.accessTokenUrl.match(/expires_in=(\w+)/)[1]

      this.$storage.setUniversal(USER_ID, userId)
      const tokenParams = { accessToken, userId, expiresIn }
      await this.$http.post('/api/saveVkToken', tokenParams)
      this.accessTokenUrl = null
      await this.$router.push('/post/create')
    }
  }
}
</script>
