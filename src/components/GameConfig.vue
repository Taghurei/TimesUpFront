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
      <div class="config__words">
        <span class="tag is-link" v-for="word in wordList" :key="word">
          {{ word }}
          <button
            class="delete is-small"
            type="button"
            @click="removeWord(word)"
          ></button>
        </span>
      </div>
      <WordPicker :existingWords="wordList" @add-words="addWords" />
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
import { mapActions, mapState } from 'vuex';
import randomWords from 'random-words';
import WordPicker from '@/components/WordPicker.vue';

export default {
  components: {
    WordPicker,
  },
  data() {
    return {
      team1: [],
      team2: [],
      newPlayer1: { name: '' },
      newPlayer2: { name: '' },
      wordList: [],
      game: {},
      gameName: randomWords(),
      isLoading: false,
      timer: 30,
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
    ...mapActions({
      addNewGame: 'games/addNewGame',
      addNewPlayer: 'players/addNewPlayer',
      getPlayers: 'players/getPlayers',
    }),
    // the WordPicker only offers words the game does not have yet,
    // so nothing to filter here
    addWords(words) {
      this.wordList.push(...words);
    },
    removeWord(word) {
      this.wordList = this.wordList.filter((element) => element !== word);
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
    }),
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
.config__words {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
  max-height: 150px;
  overflow: auto;
  margin: 10px 0;
  .tag {
    font-size: 1rem;
    height: 2em;
  }
}
</style>
