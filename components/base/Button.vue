<template>
  <button :class="color" class="rounded p-2 shadow" @click="$emit('click')">
    <slot />
  </button>
</template>

<script lang="ts">
export default {
  name: 'Button',
  props: {
    color: {
      default: 'bg-blue-300',
      required: false,
      type: String
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/css/colors";

button:disabled {
  opacity: .75;
}
</style>
