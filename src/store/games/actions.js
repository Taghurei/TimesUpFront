import axios from 'axios';

export default {
  getGames({ commit }, gameId) {
    axios
      .get('https://stormy-garden-54376.herokuapp.com/games', {
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

  addNewGame({ commit }, game) {
    console.log('actions: ', game.teams.team1);
    axios
      .post('https://stormy-garden-54376.herokuapp.com/games', game)
      .then((r) => r.data)
      .then((currentGame) => {
        commit('setCurrentGame', currentGame);
      });
  },

  setScore({
    state, commit, getters, rootState, rootGetters,
  }, game) {
    let score1 = 0;
    let score2 = 0;
    game.teams.team1.forEach((element) => {
      score1 += rootGetters['players/getPlayer'](element).score;
    });
    game.teams.team2.forEach((element) => {
      score2 += rootGetters['players/getPlayer'](element).score;
    });
    commit('setScore', { team: 'team1', score: score1 });
    commit('setScore', { team: 'team2', score: score2 });
  },

};
