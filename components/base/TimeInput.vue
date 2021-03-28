<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" class="flex flex-col w-36">
    <span class="">{{ name }}</span>
    <input :value="value" type="time" class="rounded" @input="$emit('input', $event.target.value)">
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
  message: 'время обязательно'
})

extend('futureAndNowTime', {
  validate (value: string, { check }: any) {
    const chk = check !== 'null'
    if (chk) {
      const { linkedDate } = JSON.parse(check)
      const val = parse(linkedDate + ' ' + value, DATE_FMT + ' ' + TIME_FMT, new Date())
      // const nowDateStr = format(new Date(), DATE_FMT)
      return isFuture(val)
    }
    return true
  },
  params: ['check'],
  message: 'время в прошлом'
})

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
    futureAndNow: {
      // type: {linkedDate: string}
      type: Object,
      required: false,
      default: () => null
    }
  },

  computed: {
    rules (): string {
      return `required|futureAndNowTime:${JSON.stringify(this.futureAndNow)}`
    }
  }
})
</script>

<style scoped>
input[type="time"] {
  padding-left: 2.8rem;
}
</style>
