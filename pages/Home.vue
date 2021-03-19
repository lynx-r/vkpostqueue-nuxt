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
    const accessToken = '262dd552407b565f6c9afc3bc2d5602f7815f5528dee70c2ae0fc176d6ee36ec20dfbb6f796b7675f4792' //$cookies.get('accessToken');
    console.log(accessToken);
    const vk = new VKAPI({accessToken: accessToken});
    const res = await vk.wall.post({accessToken, ownerId: '-203255283', message: 'msg', fromGroup: 1})
    console.log(res);
  },
  mounted() {
  }
});
</script>

<style scoped>

</style>
