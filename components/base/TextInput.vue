<template>
  <ValidationProvider
    v-slot="{ errors }"
    :rules="rules"
    class="flex flex-col"
  >
    <label for="input" class="">{{ label }}</label>
    <input
      id="input"
      :value="value"
      type="text"
      class="rounded"
      @input="$emit('input', $event.target.value)"
    >
    <span v-show="!_.isEmpty(errors)" class="text-red-500 text-sm">{{ errors[0] }}</span>
    <span v-show="_.isEmpty(errors)" class="text-sm">&nbsp;</span>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'TextInput',

  props: {
    label: {
      type: String,
      required: true
    },
    rules: {
      type: String,
      required: false,
      default: 'required'
    },
    value: {
      required: true,
      type: String
    }
  }
}
</script>
