import { isFuture } from 'date-fns'
import { extend } from 'vee-validate'
import { mimes, required } from 'vee-validate/dist/rules'
import { parseDateTime } from '~/plugins/utils/utils'

export const createValidators = () => {
  extend('required', {
    ...required,
    message: '* поле обязательно'
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

  extend('vkAuthUrl', {
    validate (value: string) {
      return !!value &&
        value.includes('access_token') &&
        value.includes('user_id') &&
        value.includes('expires_in')
    },
    message: '* неверная ссылка авторизации'
  })

  extend('onlyFutureDateWithTime', {
    validate (value: string, { linkedTime }: any) {
      if (linkedTime) {
        const date = parseDateTime(value, linkedTime)
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
        const date = parseDateTime(linkedDate, value)
        return isFuture(date)
      }
      return true
    },
    params: ['linkedDate'],

    message: '* время в прошлом'
  })
}
