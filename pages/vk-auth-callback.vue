<template>
  <div />
</template>

<script>
export default {
  name: 'VkAuthCallback',

  mounted () {
    const match = this.$route.hash.match(/access_token=(\w+)&/)
    if (match) {
      const { QUEUE_URL } = this.$const
      const accessToken = match[1]
      this.$ctxUtils.setAccessToken(accessToken, this.tokenCreatedAt)
      this.$ctxUtils.setUserId(this.$config.vkUserId)
      this.$router.push(QUEUE_URL)
    }
  }
}
</script>
