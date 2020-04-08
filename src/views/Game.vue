<template>
  <div v-if="display" class="container">
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
</template>

<script>
import Team from '@/components/Team.vue';
import WordToGuess from '@/components/WordToGuess.vue';
import { Component, Vue } from 'vue-property-decorator';
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
    };
  },

  methods: {
    ...mapGetters({
      currentGame: 'games/currentGame',
    }),
    ...mapActions({
      getGames: 'games/getGames',
      getPlayers: 'players/getPlayers',
    }),
    click() {
      console.log(this.games);
    },
  },

  created() {
    this.getGames('games');
    this.getPlayers('players');
  },

  components: {
    WordToGuess,
    Team,
  },
};

</script>
<style scoped lang="scss">


</style>
