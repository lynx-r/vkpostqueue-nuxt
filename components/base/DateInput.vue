<template>
  <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules" class="flex flex-col w-36">
    <span class="">{{ label }}</span>
    <input :value="value" type="date" class="rounded" @input="$emit('input', $event.target.value)">
    <span v-show="!_.isEmpty(errors)" class="text-red-500 text-sm">{{ errors[0] }}</span>
    <span v-show="_.isEmpty(errors)" class="text-sm">&nbsp;</span>
  </ValidationProvider>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DateInput',

  props: {
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: false,
      default: 'dateInput'
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
})
</script>
