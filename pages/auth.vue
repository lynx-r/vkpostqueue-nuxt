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
export default {
  name: 'Login',

  data() {
    return {
      accessTokenUrl: '',
      isShownAccessTokenForm: true
    };
  },

  methods: {
    showAccessTokenForm() {
      this.isShownAccessTokenForm = true;
    },

    async saveAccessToken() {
      const accessToken = this.accessTokenUrl.match(/access_token=(\w+)/)[1];
      const userId = this.accessTokenUrl.match(/user_id=(\w+)/)[1];
      const expiresIn = this.accessTokenUrl.match(/expires_in=(\w+)/)[1];

      this.$store.commit('auth/setUserId', userId);
      const tokenParams = {accessToken, userId, expiresIn};
      const res = await this.$http.post('/api/saveVkToken', tokenParams);
      const status = await res.json();
      console.log(status);
      await this.$router.push('post');
    }
  }
};
</script>

<style scoped>

</style>
