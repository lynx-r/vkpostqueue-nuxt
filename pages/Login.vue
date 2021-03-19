<template>
  <div>
    <button class="bg-blue-300 rounded px-4" @click="login">
      Авторизоваться в ВКонтакте
    </button>
  </div>
</template>

<script>

import { defineNuxtConfig, useContext } from '@nuxtjs/composition-api';

export default defineNuxtConfig({
  name: 'Login',
  setup() {
    const {$config, redirect} = useContext();
    const {vkAuthorizeUrl} = $config;
    return {vkAuthorizeUrl, redirect};
  },
  methods: {
    login() {
      this.redirect(this.vkAuthorizeUrl);
    }
  }
});
</script>

<style scoped>

</style>
