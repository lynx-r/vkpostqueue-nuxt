<template>
  <ValidationObserver v-slot="{handleSubmit, invalid}" class="flex flex-col space-y-4">
    <a
      :href="$config.vkAuthorizeUrl"
      target="_blank"
      class="bg-blue-300 w-96 block text-center rounded p-2 shadow"
      @click="setTokenCreatedAt"
    >
      Получить ссылку авторизации в ВКонтакте
    </a>
    <form>
      <div class="flex items-center space-x-4">
        <Textarea
          v-model="accessTokenUrl"
          class="h-40"
          rules="required|vkAuthUrl"
          label="Скопируйте &quot;ссылку авторизации&quot; из открывшейся вкладки"
        />
        <Button :disabled="invalid" @click="handleSubmit(onSubmit)">
          Продолжить
        </Button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      accessTokenUrl: '',
      tokenCreatedAt: new Date().getTime()
    }
  },

  methods: {
    setTokenCreatedAt () {
      this.tokenCreatedAt = new Date().getTime()
    },

    onSubmit () {
      const { QUEUE_URL } = this.$const
      const accessToken = this.accessTokenUrl.match(/access_token=(\w+)/)[1]
      const userId = +this.accessTokenUrl.match(/user_id=(\w+)/)[1]
      const expiresIn = +this.accessTokenUrl.match(/expires_in=(\w+)/)[1]

      this.$ctxUtils.setAccessToken(accessToken, this.tokenCreatedAt, expiresIn)
      this.$ctxUtils.setUserId(userId, expiresIn)

      this.$router.push(QUEUE_URL)
    }
  }
}
</script>
