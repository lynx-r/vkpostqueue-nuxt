import { getAccessorType } from 'typed-vuex'
import { ActionTree, GetterTree, MutationTree } from 'vuex'

import * as auth from '~/store/auth'
import * as post from '~/store/post'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {}

export const actions: ActionTree<RootState, RootState> = {}

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
