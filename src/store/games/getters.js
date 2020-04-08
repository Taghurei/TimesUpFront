
export default {
  getCurrentGame: (state) => (gameName) => state.games.find((game) => game.name === gameName),
  getCurrentTeam: (state, getters) => (gameName, teamName) => {
    const game = getters.getCurrentGame(gameName);
    console.log(game.teams[teamName]);
    return game.teams[teamName];
  },
};
