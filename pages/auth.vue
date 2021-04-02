<template>
  <ValidationObserver v-slot="{handleSubmit, invalid}" class="flex flex-col space-y-4">
    <a
      :href="$config.vkAuthorizeUrl"
      target="_blank"
      class="bg-blue-300 w-96 block text-center rounded p-2 shadow"
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
      accessTokenUrl: ''
    }
  },

  methods: {
    onSubmit () {
      const { ACCESS_TOKEN_KEY, USER_ID_KEY } = this.$const
      const accessToken = this.accessTokenUrl.match(/access_token=(\w+)/)[1]
      const userId = this.accessTokenUrl.match(/user_id=(\w+)/)[1]
      const expiresIn = this.accessTokenUrl.match(/expires_in=(\w+)/)[1]

      this.$storage.setCookie(ACCESS_TOKEN_KEY, accessToken, { expiresIn })
      this.$storage.setCookie(USER_ID_KEY, userId, { expiresIn })

      this.$router.push('/post/create')
    }
  }
}
</script>
