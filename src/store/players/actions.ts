import Vue from 'vue';
import axios from 'axios';

export default {

  getPlayers({ commit }: any, players: any) {
    axios
      .get(`${process.env.VUE_APP_API}/${players}`, {
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
      .post(`${process.env.VUE_APP_API}/players/${player.player_id}`, {
        score_total: player.score_total,
      })
      .then((r) => r.data);
  },

  addNewPlayer({ commit }: any, player: any) {
    console.log(player);
    return axios
      .post(`${process.env.VUE_APP_API}/players`, player);
  },
};
