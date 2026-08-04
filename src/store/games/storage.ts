const JOINED_KEY = 'timesup_joined_game';

export interface JoinedGame {
  gameId: string;
  name: string;
}

// Remembering the game a player joined lets them refresh their phone without
// having to type the host's nickname and their name all over again
export function rememberJoinedGame(joined: JoinedGame) {
  localStorage.setItem(JOINED_KEY, JSON.stringify(joined));
}

export function readJoinedGame(): JoinedGame | null {
  const stored = localStorage.getItem(JOINED_KEY);
  if (!stored) {
    return null;
  }
  try {
    return JSON.parse(stored);
  } catch (error) {
    return null;
  }
}

export function forgetJoinedGame() {
  localStorage.removeItem(JOINED_KEY);
}
