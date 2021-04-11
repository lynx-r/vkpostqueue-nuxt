<template>
  <button
    :class="color"
    class="rounded p-2 shadow"
    :disabled="disabled"
    :type="type"
    @click="$emit('click')"
  >
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
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    type: {
      type: String,
      required: false,
      default: 'button'
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
