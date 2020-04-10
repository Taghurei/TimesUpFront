<template>
  <div class="">
    <div v-if="canDisplay">
    <li v-for="player in currentTeam" v-bind:key="player">
      <a @click="changePlayer(player)">
        {{ getPlayer(player).name }}
      </a>
    </li>
    <h3> score : {{scoreTotal[team]}} </h3>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  props: ['team', 'gameName'],
  data() {
    return {
      currentTeam: [],
    };
  },
  computed: {
    ...mapState({
      scoreTotal: (state) => state.games.score_total,
    }),
    ...mapGetters({
      getCurrentTeam: 'games/getCurrentTeam',
      getPlayer: 'players/getPlayer',
    }),
    canDisplay() {
      return this.currentTeam.length;
    },
  },

  methods: {
    ...mapActions({
      changePlayer: 'players/changePlayer',
    }),
  },

  mounted() {
    this.currentTeam = this.getCurrentTeam(this.gameName, this.team);
  },

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
li{
      list-style-type: none;
      font-weight: bold;
}
</style>
