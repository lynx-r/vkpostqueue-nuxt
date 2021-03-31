import { isFuture, parse } from 'date-fns'
import { extend } from 'vee-validate'
import { mimes, required } from 'vee-validate/dist/rules'
import { DATE_FMT, TIME_FMT } from '../config-constants'

export const createValidators = () => {
  extend('required', {
    ...required,
    message: '* обязательно'
  })

  extend('mimes', {
    ...mimes,
    message (_, args) {
      const allowedMimes = Object
        .values(args)
        .slice(0, -3)
        .map(m => m.split('/')[1])
        .join(', ')
      return `* доступные типы файлов: ${allowedMimes}`
    }
  })

  extend('onlyFutureDateWithTime', {
    validate (value: string, { linkedTime }: any) {
      if (linkedTime) {
        const date = parse(value + ' ' + linkedTime, DATE_FMT + ' ' + TIME_FMT, new Date())
        // console.log(isFuture(date), 'date with time')
        return isFuture(date)
      }
      return true
    },
    params: ['linkedTime'],
    message: '* дата в прошлом'
  })

  extend('onlyFutureTimeWithDate', {
    validate (value: string, { linkedDate }: any) {
      if (linkedDate) {
        const date = parse(linkedDate + ' ' + value, DATE_FMT + ' ' + TIME_FMT, new Date())
        // console.log(isFuture(date), 'time with date')
        return isFuture(date)
      }
      return true
    },
    params: ['linkedDate'],

    message: '* время в прошлом'
  })
}
