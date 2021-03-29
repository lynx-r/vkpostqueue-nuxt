<template>
  <ValidationProvider v-slot="{ errors }" name="время" :rules="rules" class="flex flex-col w-36">
    <span class="">{{ name }}</span>
    <input :value="value" type="time" class="rounded" @input="$emit('input', $event.target.value)">
    <span v-show="!_.isEmpty(errors)" class="text-red-500 text-sm">{{ errors[0] }}</span>
    <span v-show="_.isEmpty(errors)" class="text-sm">&nbsp;</span>
  </ValidationProvider>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TimeInput',

  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      required: true,
      type: String
    },
    futureAndLinkDate: {
      // type: {linkedDate: string}
      type: Object,
      required: false,
      default: () => null
    }
  },

  computed: {
    rules (): string {
      return `required|onlyFutureWithDate:${JSON.stringify(this.futureAndLinkDate)}`
    }
  }
})
</script>

<style scoped>
input[type="time"] {
  padding-left: 2.8rem;
}
</style>
