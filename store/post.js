import { getField, updateField } from 'vuex-map-fields'
import { format } from 'date-fns'

export const state = () => ({
  topic: 'topic',
  message: 'message',
  date: format(new Date(), 'yyyy-MM-dd'),
  time: format(new Date(), 'HH:mm'),
  images: [],
})

export const getters = {
  getField
}

export const mutations = {
  setImages(state, files) {
    state.images = [...files]
  },
  updateField
}
