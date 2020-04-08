import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const namespaced = true;

const games = {
  namespaced,
  state: {
    games: [],
    score: { team1: 0, team2: 0 },
    currentGame: {},
  },

  actions,

  getters,

  mutations,
};

export default games;
