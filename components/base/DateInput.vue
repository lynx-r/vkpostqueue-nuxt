<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" class="flex flex-col w-36">
    <span class="">{{ name }}</span>
    <input :value="value" type="date" class="rounded" @input="$emit('input', $event.target.value)">
    <span v-show="!_.isEmpty(errors)" class="text-red-500 text-sm">* {{ errors[0] }}</span>
    <span v-show="_.isEmpty(errors)" class="text-sm">&nbsp;</span>
  </ValidationProvider>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { isFuture, parse } from 'date-fns'
import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import { DATE_FMT, TIME_FMT } from '~/constants'

// Override the default message.
extend('required', {
  ...required,
  message: 'дата обязательна'
})

extend('onlyFutureWithTime', {
  validate (value: string, { check }: any) {
    const chk = check !== 'null'
    if (chk) {
      const { linkedTime } = JSON.parse(check)
      const date = parse(value + ' ' + linkedTime, DATE_FMT + ' ' + TIME_FMT, new Date())
      return isFuture(date)
    }
    return true
  },
  params: ['check'],
  message: 'дата в прошлом'
})

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
