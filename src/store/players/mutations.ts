export default {
  setAllPlayers(state: any, players: any) {
    state.players = players;
  },
  newPlayer(state: any) {
    state.isPlayerSet = false;
  },
  setCurrentPlayer(state: any, playerName: any) {
    state.currentPlayer = playerName;
    state.isPlayerSet = true;
  },
};
