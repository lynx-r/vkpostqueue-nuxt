<template>
  <div class="h-full">
    <div class="mb-4">
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
    >
      Авторизоваться в ВКонтакте
    </a>
  </div>
</template>

<script>
// import { ACCESS_TOKEN_KEY, INVALID_URL, USER_ID_KEY } from '~/plugins/config-constants'

export default {
  name: 'Login',

  data () {
    return {
      accessTokenUrl: ''
    }
  },

  methods: {
    saveAccessToken () {
      const { INVALID_URL, ACCESS_TOKEN_KEY, USER_ID_KEY } = this.$const
      const gotToken = !!this.accessTokenUrl &&
          this.accessTokenUrl.includes('access_token') &&
          this.accessTokenUrl.includes('user_id') &&
          this.accessTokenUrl.includes('expires_in')

      if (!gotToken) {
        this.$toast.error(INVALID_URL)
        this.accessTokenUrl = ''
        return
      }
      const accessToken = this.accessTokenUrl.match(/access_token=(\w+)/)[1]
      const userId = this.accessTokenUrl.match(/user_id=(\w+)/)[1]
      const expiresIn = this.accessTokenUrl.match(/expires_in=(\w+)/)[1]
      this.accessTokenUrl = null

      this.$storage.setCookie(ACCESS_TOKEN_KEY, accessToken, { expiresIn })
      this.$storage.setCookie(USER_ID_KEY, userId, { expiresIn })

      this.$router.push('/post/create')
    }
  }
}
</script>
