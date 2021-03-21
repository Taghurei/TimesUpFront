<template>
  <div>
    <div class="game-config">
      <h1>Create your game !</h1>

      <h2>
        Your game name is <strong> {{ gameName }} </strong>
      </h2>

      <div class="columns">
        <div class="column">
          <div class="title">Team a</div>
          <ul>
            <li v-for="player in team1" :key="player.name">
              {{ player.name }}
            </li>
          </ul>
          <form v-on:submit.prevent="addPlayer(team1, newPlayer1)">
            <input type="text" v-model="newPlayer1.name" />
            <div
              v-if="checkIfPlayerInTeam(newPlayer1.name)"
              class="help is-danger"
            >
              The player is already in a team
            </div>
            <button
              v-if="!checkIfPlayerInTeam(newPlayer1.name)"
              class="button"
              type="submit"
            >
              Add Player
            </button>
          </form>
        </div>
        <div class="column"></div>
        <div class="column">
          <div class="title">Team b</div>
          <ul>
            <li v-for="player in team2" :key="player.name">
              {{ player.name }}
            </li>
          </ul>
          <form v-on:submit.prevent="addPlayer(team2, newPlayer2)">
            <input type="text" v-model="newPlayer2.name" />
            <div
              v-if="checkIfPlayerInTeam(newPlayer2.name)"
              class="help is-danger"
            >
              The player is already in a team
            </div>
            <button
              v-if="!checkIfPlayerInTeam(newPlayer2.name)"
              class="button"
              type="submit"
            >
              Add Player
            </button>
          </form>
        </div>
      </div>
      <div class="title">Words</div>
      Your game currently has {{ wordList.length }} word(s)
      <form v-on:submit.prevent="addNewWord()">
        <input type="text" v-model="word" />
        <button v-if="!checkIfWordInWords(word)" class="button" type="submit">
          Add Word
        </button>
        <button class="button" @click="removeLastWord()">
          Remove Last word
        </button>
        <div v-if="checkIfWordInWords(word)" class="help is-danger">
          The word was already added
        </div>
      </form>
        <select v-model="selected" class="select is-medium edit-selection">
          <option
            v-for="dictionaryName in dictionnaryList"
            :key="dictionaryName"
          >
            {{ dictionaryName }}
          </option></select
        >
      <button class="button" @click="addRandomWords()">

        Add 10 Random words
      </button>
      <div class="timer">
        <div class="title">Timer</div>
        <input type="number" v-model="timer" /> seconds per round
      </div>
      <button v-if="!isLoading" class="button is-link" @click="addGame(game)">
        Start Game
      </button>
      <button v-else class="button is-link is-loading">Start Game</button>
    </div>
  </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapActions, mapState, mapGetters } from 'vuex';
import randomWords from 'random-words';

export default {
  data() {
    return {
      team1: [],
      team2: [],
      newPlayer1: { name: '' },
      newPlayer2: { name: '' },
      word: '',
      wordList: [],
      game: {},
      gameName: randomWords(),
      isLoading: false,
      timer: 30,
      dictionnaryList: [],
      selected: null,
    };
  },
  methods: {
    addPlayer(team, newPlayer) {
      if (newPlayer.name) {
        if (!team.some((e) => e.name === newPlayer.name)) {
          team.push({ name: newPlayer.name });
          this.newPlayer1.name = '';
          this.newPlayer2.name = '';
        }
      }
    },
    checkIfPlayerInTeam(player) {
      return this.team1.concat(this.team2).some((e) => e.name === player);
    },
    checkIfWordInWords(word) {
      return this.wordList.some((e) => e.toLowerCase() === word.toLowerCase());
    },
    ...mapActions({
      addNewGame: 'games/addNewGame',
      addNewPlayer: 'players/addNewPlayer',
      getPlayers: 'players/getPlayers',
      getWordsFromDatabase: 'words/getAllWords',
    }),
    ...mapGetters({
      wordsListNames: 'words/wordsListNames',
    }),
    addNewWord() {
      if (this.word) {
        this.wordList.push(this.word);
        this.word = '';
      }
    },
    removeLastWord() {
      if (this.wordList) {
        this.wordList.pop();
      }
    },

    async addRandomWords() {
      const shuffleWords = this.randomWordsFromDatabase[this.selected].sort(
        () => 0.5 - Math.random(),
      );
      let count = 0;
      while (count < 10) {
        const wordToAdd = shuffleWords.pop();
        if (wordToAdd && !this.checkIfWordInWords(wordToAdd)) {
          this.wordList.push(wordToAdd);
          count += 1;
        }
        if (shuffleWords.length === 0) {
          break;
        }
      }
    },
    addGame() {
      this.game = {
        teams: {
          team1: [],
          team2: [],
        },
        name: this.gameName,
        words: this.wordList,
        // eslint-disable-next-line
        timer: parseInt(this.timer),
      };
      console.log(
        "If the server doesn't respond, here's what your game looks like",
      );
      console.log(this.game);
      this.isLoading = true;
      const promiseTeam1 = new Promise((resolve, reject) => {
        const teamId1 = [];
        for (let i = 0; i < this.team1.length; i += 1) {
          this.addPlayers(this.team1[i]).then((res) => {
            teamId1.push(res.player_id);
            if (teamId1.length === this.team1.length) {
              resolve(teamId1);
            }
          });
        }
      });
      const promiseTeam2 = new Promise((resolve, reject) => {
        const teamId2 = [];
        for (let i = 0; i < this.team2.length; i += 1) {
          this.addPlayers(this.team2[i]).then((res) => {
            teamId2.push(res.player_id);
            if (teamId2.length === this.team2.length) {
              resolve(teamId2);
            }
          });
        }
      });
      Promise.all([promiseTeam1, promiseTeam2]).then((teams) => {
        const i = 0;
        const j = 1;
        this.game.teams.team1 = teams[i];
        this.game.teams.team2 = teams[j];
        this.addNewGame(this.game);
      });
    },

    addPlayers(player) {
      return new Promise((resolve, reject) => {
        this.addNewPlayer(player).then((data) => {
          resolve(data);
        });
      });
    },
  },

  computed: {
    ...mapState({
      currentGame: (state) => state.games.currentGame,
      randomWordsFromDatabase: (state) => state.words.words,
    }),
  },
  created() {
    this.getWordsFromDatabase();
    this.dictionnaryList = this.wordsListNames();
  },
  watch: {
    currentGame() {
      this.getPlayers().then(() => this.$router.push({ name: 'Game', params: { gameName: this.gameName } }));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.game-config {
  .center {
    vertical-align: middle;
  }
  .is-link {
    color: white;
    margin: 10px;
  }
  strong {
    font-weight: bold;
  }
}
.timer {
  margin: 30px;
}
.edit-selection {
  height: 2.5rem !important;
  width: 218px;
  margin-right: 5px;
}
</style>
