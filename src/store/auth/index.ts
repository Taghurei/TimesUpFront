import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const namespaced = true;

const auth = {
  namespaced,
  state: {
    token: '',
    nickname: '',
    error: '',
    isLoading: false,
  },

  actions,

  getters,

  mutations,
};

export default auth;
