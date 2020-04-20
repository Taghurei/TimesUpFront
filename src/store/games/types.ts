export interface Games {
  games: Game[];
}

export interface Game {
  name: string;
  words: string[];
  teams: Team;
  timer: number;
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
