<template>
  <button :class="color || 'bg-blue-300'" class="rounded p-2 shadow" @click="$emit('click')">
    <slot/>
  </button>
</template>

<script lang="ts">
export default {
  name: 'Button',
  props: {
    color: {
      required: false,
      type: String
    }
  }
}
</script>
