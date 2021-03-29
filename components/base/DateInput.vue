<template>
  <ValidationProvider v-slot="{ errors }" name="дата" :rules="rules" class="flex flex-col w-36">
    <span class="">{{ name }}</span>
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
    name: {
      type: String,
      required: true
    },
    value: {
      required: true,
      type: String
    },
    futureAndLinkTime: {
      // type: {linkedTime: string}
      type: Object,
      required: false,
      default: () => null
    }
  },

  computed: {
    rules (): string {
      return `required|onlyFutureWithTime:${JSON.stringify(this.futureAndLinkTime)}`
    }
  }
})
</script>
