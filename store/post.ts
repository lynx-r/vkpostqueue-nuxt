import { GetterTree, MutationTree } from 'vuex'
import { getField, updateField } from 'vuex-map-fields'
import { formatDate, getRoundedTimeFromDate } from '~/plugins/utils/utils'
import { RootState } from '~/store'

export interface QueueState {
  text: string
  date: string
  time: string
  images: File[]
}

const INIT_STATE: QueueState = {
  text: '',
  date: formatDate(new Date()),
  time: getRoundedTimeFromDate(new Date()),
  images: []
}

export const state = () => INIT_STATE

export const getters: GetterTree<QueueState, RootState> = {
  getField
}

export const mutations: MutationTree<QueueState> = {
  setImages (state, images) {
    state.images = images
  },
  updateField,

  resetForm (state) {
    Object.assign(state, INIT_STATE)
  }
}
