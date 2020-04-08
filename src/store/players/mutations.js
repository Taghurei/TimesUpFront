export default {
  setAllPlayers(state, players) {
    state.players = players;
  },
  newPlayer(state) {
    state.isPlayerSet = false;
  },
  setCurrentPlayer(state, playerName) {
    state.currentPlayer = playerName;
    state.isPlayerSet = true;
  },
};
