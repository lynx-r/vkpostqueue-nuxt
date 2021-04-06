import { GetterTree, MutationTree } from 'vuex'
import { getField, updateField } from 'vuex-map-fields'
import { RootState } from '~/store'

const INIT_STATE = {
  posts: [],
  message: 'message',
  date: '',
  time: '',
  images: [] as File[]
}
export const state = () => INIT_STATE

export type PostState = ReturnType<typeof state>

export const getters: GetterTree<PostState, RootState> = {
  getField
}

export const mutations: MutationTree<PostState> = {
  setImages (state, files) {
    state.images = [...files]
  },
  updateField,

  resetForm (state) {
    Object.assign(state, INIT_STATE)
  }
}
