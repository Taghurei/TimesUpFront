<template>
  <div class="word-to-guess">
    <div v-if="isPlayerSet">
      <h3> Current player :<br/> <strong> {{player.name}} </strong> </h3>
      <h3> Word To Guess : <br/> <strong> {{wordToGuess}} </strong> </h3>
      <a v-if="!isOver && isReady"
        class="button is-warning"
        @click="refuse">
        Refuse </a>

      <a v-if="!isOver && isReady"
        class="button is-success"
        @click="validate() + $emit('validate')">
        Validate </a>
      <a v-if=isOver class="button is-link" @click="newRound">Start a new Round </a>
      <a v-if="!isReady && !isOver" class="button is-link" @click="start">Start</a>
      <Timer v-if="isReady &&!isOver" class="timer" :time-left="timeLeft" :timeLimit="timeLimit"/>
    </div>
    <div v-else>
      You need to Set the current player
    </div>
  </div>
</template>

<script>
import {
  mapActions, mapState, mapMutations, mapGetters,
} from 'vuex';
import Timer from './Timer.vue';

export default {
  props: ['gameName'],

  components: {
    Timer,
  },

  data() {
    return {
      isReady: false,
      isOver: true,
      wordToGuess: '',
      words: [],
      timeLimit: 30,
      timePassed: 0,
      timerInterval: null,
    };
  },

  computed: {
    ...mapState({
      player: (state) => state.players.currentPlayer,
      games: (state) => state.games.games,
      isPlayerSet: (state) => state.players.isPlayerSet,
    }),
    ...mapGetters({
      getGame: 'games/getCurrentGame',
    }),
    timeLeft() {
      if (this.timeLimit - this.timePassed >= 0) {
        return this.timeLimit - this.timePassed;
      }
      this.stopTimer();
      console.log('over');
      return 0;
    },
  },

  methods: {
    ...mapActions({
      needNewPlayer: 'players/needNewPlayer',
      updatePlayerScore: 'players/updatePlayerScore',
      updateTeamScore: 'games/setScore',
    }),
    stopTimer() {
      this.timePassed = 0;
      clearInterval(this.timerInterval);
    },
    startTimer() {
      this.timerInterval = setInterval(() => { this.timePassed += 1; }, 1000);
    },

    newWord() {
      const index = Math.floor(Math.random() * Math.floor(this.temporaryWordList.length));
      this.wordToGuess = this.temporaryWordList[index];
    },

    validate() {
      this.temporaryWordList = this.temporaryWordList.filter(
        (item) => item !== this.wordToGuess,
      );
      this.player.score_total += 1;
      if (this.temporaryWordList.length > 0) {
        this.newWord();
      } else {
        this.wordToGuess = '';
        this.updatePlayerScore(this.player);
        this.updateTeamScore(this.getGame(this.gameName));
        this.isOver = true;
        this.needNewPlayer();
        this.stopTimer();
      }
    },

    newRound() {
      this.isOver = false;
      this.isReady = false;
      this.words = this.getGame(this.gameName).words;
      console.log(this.words);
      this.temporaryWordList = JSON.parse(JSON.stringify(this.words));
      this.start();
    },

    start() {
      this.isReady = true;
      this.newWord();
      this.startTimer();
    },

    refuse() {
      this.updateTeamScore(this.getGame(this.gameName));
      this.updatePlayerScore(this.player);
      this.wordToGuess = '';
      this.isReady = false;
      this.needNewPlayer();
      this.stopTimer();
    },
  },
  created() {
    this.updateTeamScore(this.getGame(this.gameName));
  },

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.word-to-guess {
  .button{
    margin: 5px;
  }
  .timer{
  height: 300px;
  width: 300px;
  position: absolute;
  left: 50%;
  margin-left: -150px;
  top: 50%;
  margin-top: 150px;
  }
  strong {
    font-size: 2rem;
    font-weight: normal;
  }
}
</style>
