import { getAccessorType } from 'typed-vuex'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { getField, updateField } from 'vuex-map-fields'
import { StoredDocs } from '~/plugins/model'

import * as auth from '~/store/auth'
import * as post from '~/store/post'

export interface RootState {
  messages: StoredDocs
}

export const state = () => ({
  messages: {}
})

export const getters: GetterTree<RootState, RootState> = {
  getField
}

export const mutations: MutationTree<RootState> = {
  updateField,

  setMessages (state, messages) {
    state.messages = messages
  }
}

export const actions: ActionTree<RootState, RootState> = {
}

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    auth,
    post
  }
})
