<template>

</template>

<script>
export default {
  name: '_VkAuthorization',
  asyncData(ctx) {
    console.log(ctx.$config.vkAuthorizeUrl);
    ctx.redirect(ctx.$config.vkAuthorizeUrl)
  }
};
</script>

<style scoped>

</style>
