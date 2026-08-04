export interface Games {
  games: Game[];
}

export interface Game {
  name: string;
  words: string[];
  teams: Team;
  timer: number;
}

// A lobby is a game the host opened and that players are still joining. The back
// sends the players along with it, so their names can be shown while they arrive.
export interface Lobby extends Game {
  game_id: string;
  owner: string;
  status: string;
  players: LobbyPlayers;
}

export interface LobbyPlayers {
  team1: LobbyPlayer[];
  team2: LobbyPlayer[];
}

export interface LobbyPlayer {
  name: string;
  player_id: string;
}

export interface JoinRequest {
  gameId: string;
  name: string;
  team: string;
}

export interface Team {
  team1: string[];
  team2: string[];
}

export interface ScoreRound {
  team1: number;
  team2: number;
}

export interface ScoreTotal {
  team1: number;
  team2: number;
}
