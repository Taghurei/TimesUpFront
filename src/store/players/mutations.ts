import { Player } from './types';

export default {
  setAllPlayers(state: any, players: Player[]) {
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
