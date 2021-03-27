import { getAccessorType } from 'typed-vuex'

import * as auth from '~/store/auth'
import * as post from '~/store/post'

export const state = () => ({
  counter: 0,
  s3: null,
})

export const mutations = {
  // increment(state) {
  //   state.counter++;
  // },
}

export const actions = {
  // nuxtServerInit({state, commit, getters}: any, req: any) {
  //   const user = getters['auth/userId']
  //   console.log(process.server, user)
  //   if (!!user?.userId) {
  //     commit('auth/setUserId', user.userId)
  //   }
  // }
}

export const getters = {}

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    auth,
    post,
  },
})
