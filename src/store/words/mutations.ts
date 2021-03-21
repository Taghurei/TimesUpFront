export default {
  setWords(state: any, payload: {name: string; data: string[]}) {
    state.words[payload.name] = [...payload.data];
  },

  setAllWords(state: any, payload: any) {
    state.words = payload;
  },

};
