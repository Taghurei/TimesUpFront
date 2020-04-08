import Vue from 'vue';
import axios from 'axios';

export default {

  getPlayers({ commit }, players) {
    axios
      .get(`https://stormy-garden-54376.herokuapp.com/${players}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((r) => r.data)
      .then((playersData) => {
        commit('setAllPlayers', playersData);
      });
  },

  changePlayer({ commit, getters }, player) {
    commit('setCurrentPlayer', getters.getPlayer(player));
  },

  needNewPlayer({ commit }) {
    commit('newPlayer');
  },

  updatePlayerScore({ commit }, player) {
    axios
      .post(`https://stormy-garden-54376.herokuapp.com/players/${player.player_id}`, {
        score: player.score,
      })
      .then((r) => r.data);
  },

  addNewPlayer({ commit }, player) {
    return axios
      .post('https://stormy-garden-54376.herokuapp.com/players', player);
  },
};
