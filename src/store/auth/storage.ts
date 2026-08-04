import axios from 'axios';
import { Session } from './types';

const TOKEN_KEY = 'timesup_token';
const NICKNAME_KEY = 'timesup_nickname';

// Logging in is optional, so the token is only ever added when we have one
export function authorize(token: string) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

export function readSession(): Session {
  return {
    token: localStorage.getItem(TOKEN_KEY) || '',
    nickname: localStorage.getItem(NICKNAME_KEY) || '',
  };
}

export function saveSession(session: Session) {
  localStorage.setItem(TOKEN_KEY, session.token);
  localStorage.setItem(NICKNAME_KEY, session.nickname);
  authorize(session.token);
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(NICKNAME_KEY);
  authorize('');
}
