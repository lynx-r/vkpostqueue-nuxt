import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState } from '~/store'

export const state = () => ({
  userId: null,
})

export type AuthState = ReturnType<typeof state>

export const getters: GetterTree<AuthState, RootState> = {
  userId(state) {
    return state.userId
  },
}

export const mutations: MutationTree<AuthState> = {
  setUserId(state, token) {
    state.userId = token
  },
}

export const actions: ActionTree<AuthState, RootState> = {
  printRootState({ rootState }) {
    // console.log('accessing rootState:', rootState.name)
  },
}
