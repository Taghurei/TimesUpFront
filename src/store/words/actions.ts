import axios from 'axios';

export default {
  getWords({ commit }: any) {
    axios
      .get(`${process.env.VUE_APP_API}/words/test`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((r) => r.data)
      .then((words) => {
        commit('setWords', words);
      });
  },

};
