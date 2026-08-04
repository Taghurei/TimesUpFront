import axios from 'axios';
import {
  authorize, clearSession, readSession, saveSession,
} from './storage';
import { Credentials } from './types';

function messageFrom(error: any, fallback: string) {
  const response = error && error.response;
  if (response && response.data && response.data.message) {
    return response.data.message;
  }
  return fallback;
}

function authenticate({ commit }: any, route: string, credentials: Credentials, fallback: string) {
  commit('setError', '');
  commit('setLoading', true);
  return axios
    .post(`${process.env.VUE_APP_API}/auth/${route}`, credentials)
    .then((response) => {
      const session = { token: response.data.token, nickname: response.data.nickname };
      saveSession(session);
      commit('setSession', session);
      commit('setLoading', false);
      return session;
    })
    .catch((error) => {
      commit('setError', messageFrom(error, fallback));
      commit('setLoading', false);
      return null;
    });
}

export default {

  // Called on boot: a token kept in localStorage keeps the player logged in
  restoreSession({ commit }: any) {
    const session = readSession();
    authorize(session.token);
    commit('setSession', session);
  },

  register(context: any, credentials: Credentials) {
    return authenticate(context, 'register', credentials, 'Could not create your account');
  },

  logIn(context: any, credentials: Credentials) {
    return authenticate(context, 'login', credentials, 'Could not log you in');
  },

  logOut({ commit }: any) {
    clearSession();
    commit('clearSession');
  },

};
