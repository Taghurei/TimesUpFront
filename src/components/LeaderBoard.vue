<template>
  <div class="">
      <h2 class="score"> Score Round </h2>
      <div class="clearfix" >
      <table class="table" >
        <thead>
          <tr>
          <th>Team 1</th>
          <th>{{scoreRound.team1}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in team1" v-bind:key="player"
          v-bind:class="{ 
            first: getFirstScore(gameName, 'score_round') === getPlayer(player).score_round,
            second: getSecondScore(gameName, 'score_round') === getPlayer(player).score_round,
            third: getThirdScore(gameName, 'score_round') === getPlayer(player).score_round,
            }">
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
          <tr v-for="player in team2" v-bind:key="player"
          v-bind:class="{ 
            first: getFirstScore(gameName, 'score_round') === getPlayer(player).score_round,
            second: getSecondScore(gameName, 'score_round') === getPlayer(player).score_round,
            third: getThirdScore(gameName, 'score_round') === getPlayer(player).score_round,
            }">
          <td>{{ getPlayer(player).name }}</td>
          <td>{{ getPlayer(player).score_round }}</td>
          </tr>
        </tbody>
      </table>
      </div>
      <h2 class="score"> Score Total </h2>
      <table class="table" >
        <thead>
          <tr>
          <th>Team 1</th>
          <th>{{scoreTotal.team1}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in team1" v-bind:key="player"
          v-bind:class="{ 
            first: getFirstScore(gameName, 'score_total') === getPlayer(player).score_total,
            second: getSecondScore(gameName, 'score_total') === getPlayer(player).score_total,
            third: getThirdScore(gameName, 'score_total') === getPlayer(player).score_total,
            }">
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
          <tr v-for="player in team2" v-bind:key="player"
          v-bind:class="{ 
            first: getFirstScore(gameName, 'score_total') === getPlayer(player).score_total,
            second: getSecondScore(gameName, 'score_total') === getPlayer(player).score_total,
            third: getThirdScore(gameName, 'score_total') === getPlayer(player).score_total,
            }">
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
      getFirstScore: 'games/getFirstScore',
      getSecondScore: 'games/getSecondScore',
      getThirdScore: 'games/getThirdScore',
    }),
  },

  mounted() {
    this.team1 = this.getCurrentTeam(this.gameName, 'team1');
    this.team2 = this.getCurrentTeam(this.gameName, 'team2');
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .table{
    position:relative;
    float: left;
    width : 48%;
    margin: 1%;
  }
  .leaderboard-logo{
    height:16px;
  }
  .first{
    background-color: #FFD700;
  }
  .second{
    background-color: #C0C0C0;
  }
  .third{
    background-color: #CD7F32;
  }
  .score{
    position: static;
  }
  

.clearfix::after {
  display: block;
  content: "";
  clear: both;
}
</style>