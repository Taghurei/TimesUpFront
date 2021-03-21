import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const namespaced = true;
const words = {
  namespaced,
  state: {
    words: {
      politiciens: [],
      geographie: [],
      histoire: [],
      acteurs: [],
      film: [],
      musique: [],
      physique: [],
      astronomie: [],
      concept: [],
      objets: [],
    },
  },

  actions,

  getters,

  mutations,
};

export default words;
