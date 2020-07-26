export default {
  getWordsRequested: (state: any) => (wordListName: string) => state.words
    .find((words: any) => words.name === wordListName),
  getCurrentWords: (state: any, getters: any) => (wordList: string) => {
    const word = getters.getWordsRequested(wordList);
    return word;
  },

  test: (state: any) => (input: any) => 1,

};
