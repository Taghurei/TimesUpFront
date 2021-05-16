<template>
  <div class="container">
    <h2> Edit {{wordName}} List </h2>
    <form class="config__add-word" v-on:submit.prevent="addNewWord()">

      <input type="text" v-model="newWord" />
      <button class="button" type="submit">Add a new Word</button>
    </form>
    <div class="tag-list">
    <div v-for="element in newWordList" v-bind:key="element.name">
      <div class="tags has-addons">
        <span class="tag-name tag is-link"> {{element.name}} </span>
          <span class="tag-delete tag " @click="removeWord(element.name)">
            <i class="fa fa-times"></i>
          </span>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from 'vuex';

export default {
  props: ['wordName'],
  name: 'WordConfig',
  components: {
  },
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
  mounted() {
    this.getWordsFromDatabase(this.wordName);
  },

  watch: {
    wordsFromDatabase: {
      handler() {
        this.wordsFromDatabase[this.wordName].forEach((element) => {
          this.newWordList.push({ name: element });
        });
      },
      deep: true,
    },
  },
  computed: {
    ...mapState({
      wordsFromDatabase: (state) => state.words.words,
    }),
  },
};
</script>
<style lang="scss" scoped>
.config__add-word {
  margin-bottom: 15px;
}
.tag-list{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.tag-name{
  margin-left:0.5rem;
}
.tags:last-child {
     margin-bottom: 0rem;
}

.tag-delete{
  border: 1px solid #4a4a4a;
  border-left: 0px;
}
.tag-delete:hover{
  cursor: pointer;
  background-color: #DDD;
}
</style>
