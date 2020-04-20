import Vue from 'vue';
import axios from 'axios';
import { Player } from './types';

export default {

  getPlayers({ commit }: any, players: Player[]) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.VUE_APP_API}/players`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then((r) => r.data)
        .then((playersData) => {
          commit('setAllPlayers', playersData);
          resolve();
        });
    });
  },

  changePlayer({ commit, getters }: any, player: Player) {
    commit('setCurrentPlayer', getters.getPlayer(player));
  },

  needNewPlayer({ commit }: any) {
    commit('newPlayer');
  },

  updatePlayerScoreRound({ commit }: any, player: Player) {
    axios
      .post(`${process.env.VUE_APP_API}/players/${player.player_id}`, {
        score_round: player.score_round,
      })
      .then((r) => r.data);
  },

  updatePlayerScoreTotal({ commit }: any, player: Player) {
    axios
      .post(`${process.env.VUE_APP_API}/players/${player.player_id}`, {
        score_total: player.score_total,
      })
      .then((r) => r.data);
  },

  addNewPlayer({ commit }: any, player: Player) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${process.env.VUE_APP_API}/players`, player)
        .then((r) => resolve(r.data));
    });
  },
};
