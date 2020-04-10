import axios from 'axios';

export default {
  getGames({ commit }: any) {
    console.log('actions');
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
    console.log('actions: ', game.teams.team1);
    axios
      .post(`${process.env.VUE_APP_API}/games`, game)
      .then((r) => r.data)
      .then((currentGame) => {
        commit('setCurrentGame', currentGame);
      });
  },

  setScore({
    state, commit, getters, rootState, rootGetters,
  }: any, game: any) {
    let score1 = 0;
    let score2 = 0;
    game.teams.team1.forEach((element: any) => {
      score1 += rootGetters['players/getPlayer'](element).score_total;
    });
    game.teams.team2.forEach((element: any) => {
      score2 += rootGetters['players/getPlayer'](element).score_total;
    });
    commit('setScore', { team: 'team1', score_total: score1 });
    commit('setScore', { team: 'team2', score_total: score2 });
  },

};
