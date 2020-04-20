export default {
  setGame(state: any, games: any) {
    state.games = games;
  },

  setScore(state: any, { team, scoreType, scoreValue }: any) {
    state[scoreType][team] = scoreValue;
  },

  setCurrentGame(state: any, game: any) {
    state.currentGame = game;
  },
};
