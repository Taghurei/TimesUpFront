import axios from 'axios';
import { Game, JoinRequest } from './types';

function messageFrom(error: any, fallback: string) {
  const response = error && error.response;
  if (response && response.data && response.data.message) {
    return response.data.message;
  }
  return fallback;
}

// Every lobby route answers with the whole lobby, so one call is enough to refresh it.
// A silent call leaves the error alone: the polling must not wipe what the host
// was just told, and has nothing useful to say when it fails on its own.
function lobbyCall({ commit }: any, call: any, fallback: string, silent = false) {
  if (!silent) {
    commit('setLobbyError', '');
  }
  return call
    .then((r: any) => {
      commit('setLobby', r.data);
      return r.data;
    })
    .catch((error: any) => {
      if (!silent) {
        commit('setLobbyError', messageFrom(error, fallback));
      }
      return null;
    });
}

export default {
  getGames({ commit }: any) {
    axios
      .get(`${process.env.VUE_APP_API}/games`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((r) => r.data)
      .then((games) => {
        commit('setGame', games);
      });
  },

  addNewGame({ commit }: any, game: Game) {
    axios
      .post(`${process.env.VUE_APP_API}/games`, game)
      .then((r) => r.data)
      .then((currentGame) => {
        commit('setCurrentGame', currentGame);
      });
  },

  setScore({
    state, commit, getters, rootState, rootGetters,
  }: any, { game, scoreType }: { game: Game; scoreType: string}) {
    let score1 = 0;
    let score2 = 0;
    game.teams.team1.forEach((element: string) => {
      score1 += rootGetters['players/getPlayer'](element)[scoreType];
    });
    game.teams.team2.forEach((element: string) => {
      score2 += rootGetters['players/getPlayer'](element)[scoreType];
    });
    commit('setScore', { team: 'team1', scoreType, scoreValue: score1 });
    commit('setScore', { team: 'team2', scoreType, scoreValue: score2 });
  },

  // Host only: opens the game his friends will join with his nickname
  createLobby(context: any, timer: number) {
    return lobbyCall(
      context,
      axios.post(`${process.env.VUE_APP_API}/games/lobby`, { timer }),
      'Could not open your game',
    );
  },

  // What a player does with the host's nickname: find the game to join
  findLobby(context: any, hostNickname: string) {
    return lobbyCall(
      context,
      axios.get(`${process.env.VUE_APP_API}/games/lobby/${hostNickname}`),
      `${hostNickname} has no open game right now`,
    );
  },

  refreshLobby(context: any, gameId: string) {
    return lobbyCall(
      context,
      axios.get(`${process.env.VUE_APP_API}/games/${gameId}`),
      'Lost track of the game',
      true,
    );
  },

  addLobbyWords(context: any, { gameId, words }: { gameId: string; words: string[] }) {
    return lobbyCall(
      context,
      axios.post(`${process.env.VUE_APP_API}/games/${gameId}/words`, { words }),
      'Could not add your words',
    );
  },

  joinLobby(context: any, { gameId, name, team }: JoinRequest) {
    return lobbyCall(
      context,
      axios.post(`${process.env.VUE_APP_API}/games/${gameId}/players`, { name, team }),
      'Could not join the game',
    );
  },

  startLobby(context: any, { gameId, timer }: { gameId: string; timer: number }) {
    return lobbyCall(
      context,
      axios.post(`${process.env.VUE_APP_API}/games/${gameId}/start`, { timer }),
      'Could not start the game',
    );
  },

};
