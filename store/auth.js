export const state = () => ({
  userId: null,
});

export const mutations = {
  setUserId(state, token) {
    state.userId = token;
  },
};

export const getters = {
  userId(state) {
    return state.userId;
  },
};
