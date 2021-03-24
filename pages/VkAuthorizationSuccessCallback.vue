<template></template>

<script>
export default {
  name: 'LoginSuccess',

  mounted() {
    console.log(this.$route.fullPath);
    const accessToken = this.$route.hash.match(/access_token=(\w+)&/)[1]
    this.$cookies.set('accessToken', accessToken)
    this.$router.push('post')
  }
};
</script>
