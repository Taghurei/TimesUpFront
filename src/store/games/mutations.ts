import { Game, Games, Lobby } from './types';

export default {
  setGame(state: any, games: Games) {
    state.games = games;
  },

  setScore(state: any, { team, scoreType, scoreValue }:
    {team: string; scoreType: string; scoreValue: string }) {
    state[scoreType][team] = scoreValue;
  },

  setCurrentGame(state: any, game: Game) {
    state.currentGame = game;
  },

  setLobby(state: any, lobby: Lobby) {
    state.lobby = lobby;
  },

  setLobbyError(state: any, error: string) {
    state.lobbyError = error;
  },

  clearLobby(state: any) {
    state.lobby = null;
    state.lobbyError = '';
  },
};
