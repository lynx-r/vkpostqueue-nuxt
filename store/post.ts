import { GetterTree, MutationTree } from 'vuex'
import { getField, updateField } from 'vuex-map-fields'
import { RootState } from '~/store'

export const state = () => ({
  message: 'message',
  date: '',
  time: '',
  images: [] as File[],
  validatedDate: false
})

export type PostState = ReturnType<typeof state>

export const getters: GetterTree<PostState, RootState> = {
  getField
}

export const mutations: MutationTree<PostState> = {
  setImages (state, files) {
    state.images = [...files]
  },
  updateField
}
