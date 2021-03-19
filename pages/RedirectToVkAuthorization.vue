<template></template>

<script>
export default {
  name: 'RedirectVkAuthorization',
  asyncData(ctx) {
    console.log(ctx.$config.vkAuthorizeUrl);
    // ctx.redirect(ctx.$config.vkAuthorizeUrl)
  }
};
</script>
