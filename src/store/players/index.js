import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const namespaced = true;

const players = {
  namespaced,
  state: {
    players: [],
    currentPlayer: '',
    isPlayerSet: false,
  },

  actions,

  getters,

  mutations,
};

export default players;
