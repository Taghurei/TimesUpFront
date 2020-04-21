import { Player } from './types';

export default {
  setAllPlayers(state: any, players: Player[]) {
    state.players = players;
  },
  newPlayer(state: any) {
    state.isPlayerSet = false;
  },
  setCurrentPlayer(state: any, playerName: string) {
    state.currentPlayer = playerName;
    state.isPlayerSet = true;
  },
};
