<template>
  <div class="">
      <h2> Score Round </h2>
      <table class="table" >
        <thead>
          <tr>
          <th>Team 1</th>
          <th>{{scoreRound.team1}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in team1" v-bind:key="player">
          <td>{{ getPlayer(player).name }}</td>
          <td>{{ getPlayer(player).score_round }}</td>
          </tr>
        </tbody>
      </table>
      <table class="table" >
        <thead>
          <tr>
          <th>Team 2</th>
          <th>{{scoreRound.team2}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in team2" v-bind:key="player">
          <td>{{ getPlayer(player).name }}</td>
          <td>{{ getPlayer(player).score_round }}</td>
          </tr>
        </tbody>
      </table>
      <h2> Score Total </h2>
      <table class="table" >
        <thead>
          <tr>
          <th>Team 1</th>
          <th>{{scoreTotal.team1}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in team1" v-bind:key="player">
          <td>{{ getPlayer(player).name }}</td>
          <td>{{ getPlayer(player).score_total }}</td>  
          </tr>
        </tbody>
      </table>
      <table class="table" >
        <thead>
          <tr>
          <th>Team 2</th>
          <th>{{scoreTotal.team2}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in team2" v-bind:key="player">
          <td>{{ getPlayer(player).name }}</td>
          <td>{{ getPlayer(player).score_total }}</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  props: ['team', 'gameName'],
  data() {
    return {
      team1: [],
      team2: [],
    };
  },
  computed: {
    ...mapState({
      scoreTotal: (state) => state.games.score_total,
      scoreRound: (state) => state.games.score_round,
    }),
    ...mapGetters({
      getCurrentTeam: 'games/getCurrentTeam',
      getPlayer: 'players/getPlayer',
    }),
  },

  mounted() {
    this.team1 = this.getCurrentTeam(this.gameName, 'team1');
    this.team2 = this.getCurrentTeam(this.gameName, 'team2');
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .table{
    position:relative;
    float: left;
    width : 47%;
    margin-right: 2%;
  }
</style>