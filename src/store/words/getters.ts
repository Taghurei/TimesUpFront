export default {

  getCurrentWords: (state: any) => state.words,

  wordsListNames: (state: any) => Object.keys(state.words),
};
