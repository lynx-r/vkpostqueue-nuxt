<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="name"
    :rules="rules"
    :immediate="immediate"
    class="flex flex-col w-36"
  >
    <span class="">{{ label }}</span>
    <input
      :value="value"
      type="time"
      class="rounded"
      @input="$emit('input', $event.target.value)"
    >
    <span v-show="!_.isEmpty(errors)" class="text-red-500 text-sm">{{ errors[0] }}</span>
    <span v-show="_.isEmpty(errors)" class="text-sm">&nbsp;</span>
  </ValidationProvider>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TimeInput',

  props: {
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: false,
      default: 'timeInput'
    },
    rules: {
      type: String,
      required: false,
      default: 'required'
    },
    value: {
      required: true,
      type: String
    },
    // to immediate detect onSubHours()
    immediate: {
      type: Boolean,
      required: false,
      default: true
    }
  }
})
</script>

<style scoped>
input[type="time"] {
  padding-left: 2.8rem;
}
</style>
