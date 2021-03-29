import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import Vue from 'vue'
import { required } from 'vee-validate/dist/rules'
import { isFuture, parse } from 'date-fns'
import { DATE_FMT, TIME_FMT } from './config-constants'

// Override the default message.
extend('required', {
  ...required,
  message: '* обязательно'
})

extend('onlyFutureWithTime', {
  validate (value: string, { check }: any) {
    console.log(0, check)
    const chk = check !== 'null'
    if (chk) {
      const { linkedTime } = JSON.parse(check)
      const date = parse(value + ' ' + linkedTime, DATE_FMT + ' ' + TIME_FMT, new Date())
      console.log(isFuture(date))
      return isFuture(date)
    }
    return true
  },
  params: ['check'],
  message: 'дата в прошлом'
})

extend('onlyFutureWithDate', {
  validate (value: string, { check }: any) {
    console.log(1, check)
    const chk = check !== 'null'
    if (chk) {
      const { linkedDate } = JSON.parse(check)
      const date = parse(linkedDate + ' ' + value, DATE_FMT + ' ' + TIME_FMT, new Date())
      console.log(isFuture(date))
      return isFuture(date)
    }
    return true
  },
  lazy: false,
  params: ['check'],
  message: 'время в прошлом'
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
