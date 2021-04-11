<template>
  <div :class="{'bg-red-100': expired, 'bg-green-100': !expired}" class="p-4 rounded flex justify-between">
    <span>{{ postOnDate }}: {{ message.slug }}</span>
    <span class="cursor-pointer text-red-700" @click="$emit('remove', message.id)">&times;</span>
  </div>
</template>

<script>
export default {
  name: 'PostListItem',
  props: {
    message: {
      type: Object,
      required: true
    }
  },

  computed: {
    expired () {
      return this.$utils.isPastISO(this.message.postOnDate)
    },

    postOnDate () {
      return this.$utils.formatDatetimeISO(this.message.postOnDate)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "assets/css/colors";
</style>
