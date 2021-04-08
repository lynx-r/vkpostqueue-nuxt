import { GetterTree, MutationTree } from 'vuex'
import { getField, updateField } from 'vuex-map-fields'
import { RootState } from '~/store'

export interface QueueState {
  message: string
  date: string
  time: string
  images: File[]
}

const INIT_STATE: QueueState = {
  message: 'message',
  date: '',
  time: '',
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
