<template>
  <div>
    <div class="game-config">
      <h1>Create your game !</h1>

      <h2>Your game name is  <strong> {{gameName}} </strong> </h2>

      <div class="columns">
        <div class="column">
          <div class="title">Team a</div>
          <ul>
            <li v-for="player in team1" :key="player.name">{{ player.name }}</li>
          </ul>
          <form v-on:submit.prevent="addPlayer(team1, newPlayer1)">
            <input type="text" v-model="newPlayer1.name" />
            <div
              v-if="checkIfPlayerInTeam(team1, newPlayer1.name)"
              class="help is-danger"
            >
              The player is already in the team
            </div>
            <button
              v-if="!checkIfPlayerInTeam(team1, newPlayer1.name)"
              class="button" type="submit"
            >
              Add Player
            </button>
          </form>
        </div>
        <div class="column">
        </div>
          <div class="column">
            <div class="title">Team b</div>
            <ul>
              <li v-for="player in team2" :key="player.name">{{ player.name }}</li>
            </ul>
            <form v-on:submit.prevent="addPlayer(team2, newPlayer2)">
              <input type="text" v-model="newPlayer2.name" />
            <div
              v-if="checkIfPlayerInTeam(team2, newPlayer2.name)"
              class="help is-danger"
            >
              The player is already in the team
            </div>
            <button
              v-if="!checkIfPlayerInTeam(team2, newPlayer2.name)"
              class="button" type="submit"
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
        <button class="button" type="submit">Add Word</button>
      </form>
      <button class="button is-link" @click="addGame(game)">Start Game</button>
    </div>
  </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
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
    };
  },
  methods: {
    addPlayer(team, newPlayer) {
      if (newPlayer.name) {
        if (team.some((e) => e.name === newPlayer.name)) {
          console.log('alreadu in');
        } else {
          team.push({ name: newPlayer.name });
          this.newPlayer1.name = '';
          this.newPlayer2.name = '';
        }
      }
    },
    checkIfPlayerInTeam(team, word) {
      return (team.some((e) => e.name === word));
    },
    ...mapActions({
      addNewGame: 'games/addNewGame',
      addNewPlayer: 'players/addNewPlayer',
    }),
    addNewWord() {
      if (this.word) {
        this.wordList.push(this.word);
        this.word = '';
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
      };
      const promiseTeam1 = new Promise((resolve, reject) => {
        for (let i = 0; i < this.team1.length; i += 1) {
          this.addPlayers(this.team1[i])
            .then((res) => {
              this.game.teams.team1.push(res.data.player_id);
              if (i === this.team1.length - 1) {
                resolve();
              }
            });
        }
      });
      const promiseTeam2 = new Promise((resolve, reject) => {
        for (let i = 0; i < this.team2.length; i += 1) {
          this.addPlayers(this.team2[i])
            .then((res) => {
              this.game.teams.team2.push(res.data.player_id);
              if (i === this.team2.length - 1) {
                resolve();
              }
            });
        }
      });
      Promise.all([promiseTeam1, promiseTeam2])
        .then(() => {
          this.addNewGame(this.game).then(
            this.$router.push({ name: 'Game', params: { gameName: this.gameName } }),
          );
        });
    },

    addPlayers(player) {
      return new Promise((resolve, reject) => {
        this.addNewPlayer(player).then((data) => {
          resolve(data);
        });
      });
    },
    checkGame() {
      console.log(this.game);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.game-config{
  .center{
        vertical-align: middle;
  }
  .is-link{
    color:white;
    margin:10px;
  }
  strong{
    font-weight: bold;
  }
}

</style>
