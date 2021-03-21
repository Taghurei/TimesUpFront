import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const namespaced = true;
const words = {
  namespaced,
  state: {
    words: {
      test: [],
      geography: [],
    },
  },

  actions,

  getters,

  mutations,
};

export default words;
