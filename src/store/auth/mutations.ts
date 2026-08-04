import { Session } from './types';

export default {
  setSession(state: any, session: Session) {
    state.token = session.token;
    state.nickname = session.nickname;
  },

  clearSession(state: any) {
    state.token = '';
    state.nickname = '';
    state.error = '';
  },

  setError(state: any, error: string) {
    state.error = error;
  },

  setLoading(state: any, isLoading: boolean) {
    state.isLoading = isLoading;
  },
};
