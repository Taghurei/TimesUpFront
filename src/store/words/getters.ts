export default {
  getWordsRequested: (state: any) => (wordListName: string) => {
    state.words[wordListName]
      .find((words: any) => words.name === wordListName);
  },
  getCurrentWords: (state: any, getters: any) => (wordList: string) => state.words,

  test: (state: any) => (input: any) => 1,

};
