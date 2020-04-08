export default {
  setGame(state, games) {
    state.games = games;
  },

  setScore(state, { team, score }) {
    state.score[team] = score;
  },

  setCurrentGame(state, game) {
    state.currentGame = game;
  },
};
