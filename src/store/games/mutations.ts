export default {
  setGame(state: any, games: any) {
    state.games = games;
  },

  setScore(state: any, { team, score_total }: any) {
    state.score_total[team] = score_total;
  },

  setCurrentGame(state: any, game: any) {
    state.currentGame = game;
  },
};
