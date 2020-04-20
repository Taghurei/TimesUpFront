import axios from 'axios';

export default {
  getGames({ commit }: any) {
    axios
      .get(`${process.env.VUE_APP_API}/games`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((r) => r.data)
      .then((games) => {
        commit('setGame', games);
      });
  },

  addNewGame({ commit }: any, game: any) {
    axios
      .post(`${process.env.VUE_APP_API}/games`, game)
      .then((r) => r.data)
      .then((currentGame) => {
        commit('setCurrentGame', currentGame);
      });
  },

  setScore({
    state, commit, getters, rootState, rootGetters,
  }: any, { game, scoreType }: any) {
    let score1 = 0;
    let score2 = 0;
    game.teams.team1.forEach((element: any) => {
      score1 += rootGetters['players/getPlayer'](element)[scoreType];
    });
    game.teams.team2.forEach((element: any) => {
      score2 += rootGetters['players/getPlayer'](element)[scoreType];
    });
    commit('setScore', { team: 'team1', scoreType, scoreValue: score1 });
    commit('setScore', { team: 'team2', scoreType, scoreValue: score2 });
  },

};
