<template>
  <span v-if="visible" class="bg-red-100">
    Оставшееся время действие <i>ссылки авторизации</i>: {{ expiresIn }}.
    Обновить <NuxtLink :to="$const.AUTH_URL">здесь</NuxtLink>
  </span>
</template>

<script>
export default {
  name: 'ReAuthRequiredIn',

  data () {
    const expiresTime = this.$ctxUtils.getExpiresTime()
    return {
      expiresTime
    }
  },

  computed: {
    expiresIn () {
      const { formatted } = this.expiresTime
      return formatted
    },

    visible () {
      const { notUsed } = this.expiresTime
      if (notUsed) {
        return false
      }
      const { duration: { hours } } = this.expiresTime
      return this.$route.path !== this.$const.AUTH_URL && hours < this.$const.AUTH_EXPIRES_REST_HOURS
    }
  }
}
</script>

<style scoped>

</style>
