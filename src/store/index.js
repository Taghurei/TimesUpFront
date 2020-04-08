import Vue from 'vue';
import Vuex from 'vuex';
import games from './games/index';
import players from './players/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    games,
    players,
  },
  state: {

  },

  actions: {

  },

  getters: {

  },

  mutations: {

  },

});
