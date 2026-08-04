<template>
  <div class="word-picker">
    <form v-on:submit.prevent="addTypedWord()">
      <input type="text" v-model="word" placeholder="A word to guess" />
      <button v-if="!isAlreadyThere" class="button" type="submit">Add word</button>
    </form>
    <div v-if="isAlreadyThere" class="help is-danger">
      {{ word }} is already in the game
    </div>

    <h3 class="word-picker__title">Or pick from a dictionary</h3>
    <select v-model="selected" class="select is-medium edit-selection">
      <option v-for="dictionaryName in dictionaryList" :key="dictionaryName">
        {{ dictionaryName }}
      </option>
    </select>
    <button class="button" @click="displayDictionary = !displayDictionary">
      {{ displayDictionary ? 'Hide' : 'Display' }} dictionary
    </button>
    <div v-if="displayDictionary" class="word-picker__list">
      <div
        class="button is-light"
        v-for="(dictionaryWord, index) in wordsToDisplay"
        :key="dictionaryWord ? dictionaryWord : index"
        @click="add(dictionaryWord)"
      >
        {{ dictionaryWord }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'WordPicker',
  props: {
    existingWords: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      word: '',
      selected: null,
      displayDictionary: false,
    };
  },
  computed: {
    ...mapState({
      dictionaries: (state) => state.words.words,
    }),
    ...mapGetters({
      dictionaryList: 'words/wordsListNames',
    }),
    isAlreadyThere() {
      return Boolean(this.word.trim()) && this.contains(this.word);
    },
    // Words the game does not have yet, so nobody adds the same one twice
    wordsToDisplay() {
      const dictionary = this.dictionaries[this.selected] || [];
      return dictionary.filter((word) => !this.contains(word));
    },
  },
  methods: {
    ...mapActions({
      getWordsFromDatabase: 'words/getAllWords',
    }),
    contains(word) {
      return this.existingWords.some(
        (existing) => existing.toLowerCase() === word.trim().toLowerCase(),
      );
    },
    add(word) {
      if (word) {
        this.$emit('add-words', [word]);
      }
    },
    addTypedWord() {
      if (this.word.trim() && !this.contains(this.word)) {
        this.add(this.word.trim());
        this.word = '';
      }
    },
  },
  watch: {
    dictionaryList: {
      handler() {
        if (!this.selected && this.dictionaryList.length) {
          const [firstDictionary] = this.dictionaryList;
          this.selected = firstDictionary;
        }
      },
      immediate: true,
    },
  },
  created() {
    this.getWordsFromDatabase();
  },
};
</script>

<style scoped lang="scss">
.word-picker {
  .word-picker__title {
    color: #4267b3;
    margin: 10px;
  }
  .word-picker__list {
    max-height: 200px;
    overflow: auto;
    margin: 6px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    justify-content: center;
  }
  .edit-selection {
    height: 2.5rem !important;
    width: 218px;
    margin-right: 5px;
  }
}
</style>
