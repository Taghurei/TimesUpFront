import { Game } from './types';

export default {
  setGame(state: any, games: any) {
    state.games = games;
  },

  setScore(state: any, { team, scoreType, scoreValue }:
    {team: string; scoreType: string; scoreValue: string }) {
    state[scoreType][team] = scoreValue;
  },

  setCurrentGame(state: any, game: Game) {
    state.currentGame = game;
  },
};
