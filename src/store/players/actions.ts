import Vue from 'vue';
import axios from 'axios';

export default {

  getPlayers({ commit }: any, players: any) {
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

  changePlayer({ commit, getters }: any, player: any) {
    commit('setCurrentPlayer', getters.getPlayer(player));
  },

  needNewPlayer({ commit }: any) {
    commit('newPlayer');
  },

  updatePlayerScore({ commit }: any, player: any) {
    axios
      .post(`https://stormy-garden-54376.herokuapp.com/players/${player.player_id}`, {
        score: player.score,
      })
      .then((r) => r.data);
  },

  addNewPlayer({ commit }: any, player: any) {
    console.log(player);
    return axios
      .post('https://stormy-garden-54376.herokuapp.com/players', player);
  },
};
