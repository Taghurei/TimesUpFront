import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const namespaced = true;
const words = {
  namespaced,
  state: {
    words: [],
  },

  actions,

  getters,

  mutations,
};

export default words;