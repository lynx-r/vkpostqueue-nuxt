<template>
  <div>
    <div v-if="isShownAccessTokenForm">
      <div>Скопируйте access_token в это поле</div>
      <input type="text" v-model="accessTokenUrl">
      <button class="bg-blue-300 rounded px-4" @click="saveAccessToken">
        Сохранить "Ключ доступа"
      </button>
    </div>
    <div>
      <a :href="$config.vkAuthorizeUrl"
         target="_blank"
         class="bg-blue-300 rounded px-4"
         @click="showAccessTokenForm"
      >
        Авторизоваться в ВКонтакте
      </a>
    </div>
  </div>
</template>

<script>
import { USER_ID } from '~/constants'

export default {
  name: 'Login',

  data() {
    return {
      accessTokenUrl: '',
      isShownAccessTokenForm: true
    }
  },

  methods: {
    showAccessTokenForm() {
      this.isShownAccessTokenForm = true
    },

    async saveAccessToken() {
      const gotToken = !!this.accessTokenUrl
          && this.accessTokenUrl.includes('access_token')
          && this.accessTokenUrl.includes('user_id')
          && this.accessTokenUrl.includes('expires_in')
      if (!gotToken) {
        return
      }
      const accessToken = this.accessTokenUrl.match(/access_token=(\w+)/)[1]
      const userId = this.accessTokenUrl.match(/user_id=(\w+)/)[1]
      const expiresIn = this.accessTokenUrl.match(/expires_in=(\w+)/)[1]

      this.$storage.setUniversal(USER_ID, userId)
      const tokenParams = {accessToken, userId, expiresIn}
      await this.$http.post('/api/saveVkToken', tokenParams)
      this.accessTokenUrl = null
      await this.$router.push('/post/list')
    }
  }
}
</script>

<style scoped>

</style>
