export default {
  setGame(state: any, games: any) {
    state.games = games;
  },

  setScore(state: any, { team, score }: any) {
    state.score[team] = score;
  },

  setCurrentGame(state: any, game: any) {
    state.currentGame = game;
  },
};
