import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const namespaced = true;
const words = {
  namespaced,
  state: {
    words: {
      personnalites: [],
      geographie: [],
      histoire: [],
      cinema: [],
      musique: [],
      concept: [],
      objets: [],
      autre: [],
    },
  },

  actions,

  getters,

  mutations,
};

export default words;
