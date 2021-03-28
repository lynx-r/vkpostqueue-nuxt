import { GetterTree, MutationTree } from 'vuex'
import { getField, updateField } from 'vuex-map-fields'
import { format } from 'date-fns'
import { RootState } from '~/store'


export const state = () => ({
  message: 'message',
  date: format(new Date(), 'yyyy-MM-dd'),
  time: format(new Date(), 'HH:mm'),
  images: [] as File[],
})

export type PostState = ReturnType<typeof state>

export const getters: GetterTree<PostState, RootState> = {
  getField
}

export const mutations: MutationTree<PostState> = {
  setImages(state, files) {
    state.images = [...files]
  },
  updateField
}
