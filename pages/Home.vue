<template>
  <div>
    Главная
  </div>
</template>

<script>
import { defineNuxtConfig } from '@nuxtjs/composition-api';
import { VKAPI } from 'vkontakte-api';

export default defineNuxtConfig({
  name: 'Home',

  async asyncData({$cookies}) {
    const accessToken = $cookies.get('accessToken');
    console.log(accessToken);
    const vk = new VKAPI({accessToken: accessToken});
    const res = await vk.wall.post({accessToken, ownerId: '', message: 'msg', fromGroup: 1});
    console.log(res);
  },
  mounted() {
  }
});
</script>

<style scoped>

</style>
