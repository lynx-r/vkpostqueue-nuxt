import { GetterTree, MutationTree } from 'vuex'
import { getField, updateField } from 'vuex-map-fields'
import { format, roundToNearestMinutes } from 'date-fns'
import { DATE_FMT, TIME_FMT, TIME_NEAREST_TO } from '~/constants'
import { RootState } from '~/store'

export const state = () => ({
  message: 'message',
  date: format(new Date(), DATE_FMT),
  time: format(roundToNearestMinutes(new Date(), { nearestTo: TIME_NEAREST_TO }), TIME_FMT),
  images: [] as File[]
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
