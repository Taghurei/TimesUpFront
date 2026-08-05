<template>
  <div>
    <div v-if="display && currentGameIsCharged" class="container">
      <div class="team vertical-center">
        <Team :team="team1" :gameName="gameName"/>
      </div>

      <div class="guess vertical-center">
        <WordToGuess :gameName="gameName"/>
      </div>
      <div class="team vertical-center">
        <Team  :team="team2" :gameName="gameName"/>
      </div>
    </div>
    <div v-else class="loading">
      <a class="button is-loading is-link">Loading </a>
        <p>
          Loading the Game
        </p>
    </div>
  </div>
</template>

<script>
import Team from '@/components/Team.vue';
import WordToGuess from '@/components/WordToGuess.vue';
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  props: ['gameName'],
  computed: {
    ...mapState({
      games: (state) => state.games.games,
      players: (state) => state.players.players,
    }),
    display() {
      return (this.games.length && this.players.length);
    },
  },

  data() {
    return {
      team1: 'team1',
      team2: 'team2',
      currentGameIsCharged: false,
    };
  },
  watch: {
    games() {
      this.games.forEach((element) => {
        if (element.name === this.gameName) {
          this.currentGameIsCharged = true;
        }
      });
    },
  },
  methods: {
    ...mapGetters({
      currentGame: 'games/currentGame',
    }),
    ...mapActions({
      getGames: 'games/getGames',
      getPlayers: 'players/getPlayers',
    }),
  },

  created() {
    this.getGames();
    this.getPlayers();
  },

  components: {
    WordToGuess,
    Team,
  },
};

</script>
<style scoped>
.container{
  height: 80vh;
}
.loading{
    position: relative;
    transform: translateY(100%);
}

/* stacked on phones, with the word and timer first: that is what the whole
   table looks at, the team lists are just navigation */
@media screen and (max-width: 768px) {
  .container {
    height: auto;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
  }
  .guess {
    order: -1;
    margin-bottom: 20px;
  }
}
</style>
