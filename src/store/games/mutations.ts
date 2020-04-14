export default {
  setGame(state: any, games: any) {
    state.games = games;
  },

  setScore(state: any, { team, score_type, score_value }: any) {
    state[score_type][team] = score_value;
  },

  setCurrentGame(state: any, game: any) {
    state.currentGame = game;
  },
};
