export const state = () => ({
  token: null,
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
};

export const getters = {
  getToken(state) {
    return state.token;
  },

  isAuthenticated(state) {
    return !!state.token;
  }
};
