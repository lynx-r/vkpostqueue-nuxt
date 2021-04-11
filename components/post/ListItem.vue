<template>
  <div :class="{'bg-red-100': expired, 'bg-green-100': !expired}" class="p-4 rounded flex justify-between">
    <div>{{ postOnDate }}: {{ message.slug }}</div>
    <div class="flex space-x-4">
      <div
        v-if="!expired"
        class="cursor-pointer"
        @click="$emit('edit', message.id)"
      >
        ред.
      </div>
      <div
        class="cursor-pointer text-red-700"
        @click="$emit('remove', message.id)"
      >
        &times;
      </div>
    </div>
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
