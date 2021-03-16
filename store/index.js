import { S3Client } from '@aws-sdk/client-s3';

export const state = () => ({
  counter: 0,
  s3: null,
});

export const mutations = {
  increment(state) {
    state.counter++;
  },

  setS3(state, s3) {
    state.s3 = s3;
  }
};

export const actions = {
  nuxtServerInit({commit}, {$config}) {
    const {s3AccessKeyId, s3SecretAccessKey, s3Region} = $config;
    const s3 = new S3Client({
      credentials: {
        accessKeyId: s3AccessKeyId,
        secretAccessKey: s3SecretAccessKey
      }, region: s3Region
    });
    // commit('setS3', s3);
  },

  sendToS3(state, params) {
    console.log(params, state.s3.send);
  }

};

export const getters = {};
