import axios from 'axios';

export default {
  getWords({ commit }: any, wordName: string) {
    axios
      .get(`${process.env.VUE_APP_API}/words/${wordName}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((r) => r.data)
      .then((words) => {
        commit('setWords', { name: wordName, data: words });
      });
  },
  getAllWords({ commit }: any) {
    axios
      .get(`${process.env.VUE_APP_API}/words/`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((r) => r.data)
      .then((words) => {
        commit('setAllWords', words);
      });
  },
  updateWords({ commit }: any, wordsToUpdate: any) {
    console.log(wordsToUpdate);
    axios
      .put(`${process.env.VUE_APP_API}/words/${wordsToUpdate.name}`, wordsToUpdate.words);
  },
};
