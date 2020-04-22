import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import games from './games/index';
import players from './players/index';
import words from './words/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    games,
    players,
    words,
  },
  state: {
    isBackUp: false,
  },

  actions: {
    wakeUpBack({ commit }: any) {
      axios
        .get(process.env.VUE_APP_API)
        .then(() => {
          commit('backIsUp');
        });
    },
  },

  getters: {

  },

  mutations: {
    backIsUp(state: any) {
      state.isBackUp = true;
    },
  },

});
