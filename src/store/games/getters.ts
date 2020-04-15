
export default {
  getCurrentGame: (state: any) => (gameName: any) => state.games
    .find((game: any) => game.name === gameName),
  getCurrentTeam: (state: any, getters: any) => (gameName: any, teamName: any) => {
    const game = getters.getCurrentGame(gameName);
    return game.teams[teamName];
  },
};
