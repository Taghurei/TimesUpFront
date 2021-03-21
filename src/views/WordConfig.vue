<template>
  <div class="container word__config">
    <h3 class="word__config-title">Edit {{ wordName }}</h3>
    <form v-on:submit.prevent="addNewWord()" class="word__config-new">
      <input type="text" v-model="newWord" />
      <button class="button" type="submit">Add a new Word</button>
    </form>
    <div class="word__config-list">
      <div v-for="element in newWordList" v-bind:key="element.name">
        <div class="tags has-addons">
          <span class="tag-name tag is-link"> {{ element.name }} </span>
          <span class="tag-delete tag" @click="removeWord(element.name)">
            <i class="fa fa-times"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  props: ['wordName'],
  name: 'WordConfig',
  components: {},
  data() {
    return {
      newWordList: [],
      newWord: '',
    };
  },
  methods: {
    ...mapActions({
      getWordsFromDatabase: 'words/getWords',
      updateWords: 'words/updateWords',
    }),
    removeWord(word) {
      this.newWordList = this.newWordList.filter((el) => el.name !== word);
      this.save();
    },
    addNewWord() {
      if (!this.newWordList.some((word) => word.name === this.newWord.trim())) {
        this.newWordList.push({ name: this.newWord.trim() });
        this.save();
      }
      this.newWord = '';
    },
    save() {
      const wordsToSave = [];
      this.newWordList.forEach((element) => {
        wordsToSave.push(element.name);
      });
      this.updateWords({ words: wordsToSave, name: this.wordName });
    },
  },
  created() {
    this.getWordsFromDatabase(this.wordName);
  },

  watch: {
    wordsFromDatabase: {
      handler() {
        if (this.wordsFromDatabase[this.wordName]) {
          this.wordsFromDatabase[this.wordName].forEach((element) => {
            this.newWordList.push({ name: element });
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      wordsFromDatabase: (state) => state.words.words,
    }),
    ...mapGetters({
      getCurrentWords: 'words/getCurrentWords',
    }),
  },
};
</script>
<style scoped lang="scss">
.word__config {
  .word__config-new {
    padding: 10px;
  }

  .word__config-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .tag-name {
    margin-left: 0.5rem;
  }
  .tags:last-child {
    margin-bottom: 0rem;
  }

  .tag-delete {
    border: 1px solid #4a4a4a;
    border-left: 0px;
  }
  .tag-delete:hover {
    cursor: pointer;
    background-color: #ddd;
  }
}
</style>
