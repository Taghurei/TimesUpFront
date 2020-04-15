
export default {
  getCurrentGame: (state: any) => (gameName: any) => state.games
    .find((game: any) => game.name === gameName),
  getCurrentTeam: (state: any, getters: any) => (gameName: any, teamName: any) => {
    const game = getters.getCurrentGame(gameName);
    return game.teams[teamName];
  },
  getFirstScore: (state: any, getters: any,rootState: any,  rootGetters: any) => (gameName: any, scoreType: any) => {
    const teams = getters.getCurrentTeam(gameName, 'team1')
      .concat(getters.getCurrentTeam(gameName, 'team2'));
      let firstScore = -1;
      teams.forEach( (player: any) => {
      if(firstScore <= rootGetters['players/getPlayer'](player)[scoreType]){
        firstScore = rootGetters['players/getPlayer'](player)[scoreType]
      }
    });
    return firstScore
  },
  getSecondScore: (state: any, getters: any,rootState: any,  rootGetters: any) => (gameName: any, scoreType: any) => {
    const teams = getters.getCurrentTeam(gameName, 'team1')
      .concat(getters.getCurrentTeam(gameName, 'team2'));
      const firstScore = getters['getFirstScore'](gameName, scoreType);
      let secondScore = -1;
      teams.forEach( (player: any) => {
      if(secondScore <= rootGetters['players/getPlayer'](player)[scoreType]
        && rootGetters['players/getPlayer'](player)[scoreType] != firstScore){
        secondScore = rootGetters['players/getPlayer'](player)[scoreType]
      }
    });
    return secondScore
  },

  getThirdScore: (state: any, getters: any,rootState: any,  rootGetters: any) => (gameName: any, scoreType: any) => {
    const teams = getters.getCurrentTeam(gameName, 'team1')
      .concat(getters.getCurrentTeam(gameName, 'team2'));
      const firstScore = getters['getFirstScore'](gameName, scoreType);
      const secondScore = getters['getSecondScore'](gameName, scoreType);
      let thirdScore = -1;
      teams.forEach( (player: any) => {
      if(thirdScore <= rootGetters['players/getPlayer'](player)[scoreType]
        && rootGetters['players/getPlayer'](player)[scoreType] != firstScore 
        && rootGetters['players/getPlayer'](player)[scoreType] != secondScore){
          thirdScore = rootGetters['players/getPlayer'](player)[scoreType]
      }
    });
    return thirdScore
  },

};
