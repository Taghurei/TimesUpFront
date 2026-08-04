<template>
  <div class="lobby-teams columns">
    <div class="column">
      <div class="title">Team A</div>
      <ul>
        <li v-for="player in players.team1" :key="player.player_id">
          {{ player.name }}
        </li>
      </ul>
      <p v-if="!players.team1.length" class="help">Nobody yet</p>
    </div>
    <div class="column">
      <div class="title">Team B</div>
      <ul>
        <li v-for="player in players.team2" :key="player.player_id">
          {{ player.name }}
        </li>
      </ul>
      <p v-if="!players.team2.length" class="help">Nobody yet</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LobbyTeams',
  props: {
    players: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.lobby-teams {
  li {
    font-weight: bold;
    font-size: 1.2rem;
  }
}
</style>
