<template>
  <div class="container join">
    <div v-if="!lobby">
      <h1>Join a game</h1>
      <form v-on:submit.prevent="find()">
        <input type="text" v-model="host" placeholder="Your host's nickname" />
        <button v-if="!isSearching" class="button is-link" type="submit">
          Find the game
        </button>
        <button v-else class="button is-link is-loading">Find the game</button>
      </form>
      <div v-if="lobbyError" class="help is-danger">{{ lobbyError }}</div>
      <router-link class="join__back help" :to="{ name: 'Home' }">
        Back to the menu
      </router-link>
    </div>

    <div v-else>
      <h1>{{ lobby.owner }}'s game</h1>

      <div v-if="!hasJoined || isPickingTeam">
        <div class="title">Pick your team</div>
        <input type="text" v-model="playerName" placeholder="Your name" />
        <button class="button" @click="join('team1')">Team A</button>
        <button class="button" @click="join('team2')">Team B</button>
        <div v-if="lobbyError" class="help is-danger">{{ lobbyError }}</div>
      </div>
      <div v-else>
        <h2 class="join__welcome">
          {{ playerName }}, you are in {{ myTeamLabel }}
        </h2>
        <a class="join__switch help" @click="isPickingTeam = true">
          Change name or team
        </a>
      </div>

      <LobbyTeams :players="lobby.players" />

      <div v-if="hasJoined && !isPickingTeam">
        <div class="title">Words</div>
        <p>{{ lobby.words.length }} word(s) in the pool</p>
        <div class="join__words">
          <span class="tag is-link" v-for="word in lobby.words" :key="word">
            {{ word }}
          </span>
        </div>
        <WordPicker :existingWords="lobby.words" @add-words="addWords" />
        <p class="help join__waiting">
          Waiting for {{ lobby.owner }} to start the game...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import LobbyTeams from '@/components/LobbyTeams.vue';
import WordPicker from '@/components/WordPicker.vue';
import {
  forgetJoinedGame, readJoinedGame, rememberJoinedGame,
} from '@/store/games/storage';

// Polled so the words the others add show up, and to follow the host's start
const REFRESH_DELAY = 2000;

const TEAM_LABELS = { team1: 'Team A', team2: 'Team B' };

export default {
  name: 'Join',
  props: ['hostNickname'],
  components: {
    LobbyTeams,
    WordPicker,
  },
  data() {
    return {
      host: this.hostNickname || '',
      playerName: '',
      isPickingTeam: false,
      isSearching: false,
      refreshInterval: null,
    };
  },
  computed: {
    ...mapState({
      lobby: (state) => state.games.lobby,
      lobbyError: (state) => state.games.lobbyError,
    }),
    allPlayers() {
      if (!this.lobby) {
        return [];
      }
      return this.lobby.players.team1.concat(this.lobby.players.team2);
    },
    hasJoined() {
      return this.allPlayers.some((player) => player.name === this.playerName);
    },
    myTeamLabel() {
      const teams = Object.keys(TEAM_LABELS);
      const myTeam = teams.find((team) => this.lobby.players[team]
        .some((player) => player.name === this.playerName));
      return TEAM_LABELS[myTeam];
    },
  },
  methods: {
    ...mapActions({
      findLobby: 'games/findLobby',
      refreshLobby: 'games/refreshLobby',
      addLobbyWords: 'games/addLobbyWords',
      joinLobby: 'games/joinLobby',
    }),
    find() {
      const host = this.host.trim();
      if (!host) {
        return;
      }
      this.isSearching = true;
      this.findLobby(host).then((lobby) => {
        this.isSearching = false;
        if (lobby) {
          this.watchLobby(lobby.game_id);
        }
      });
    },
    join(team) {
      const name = this.playerName.trim();
      if (!name) {
        return;
      }
      this.playerName = name;
      this.joinLobby({ gameId: this.lobby.game_id, name, team }).then((lobby) => {
        if (lobby) {
          this.isPickingTeam = false;
          rememberJoinedGame({ gameId: lobby.game_id, name });
        }
      });
    },
    addWords(words) {
      this.addLobbyWords({ gameId: this.lobby.game_id, words });
    },
    // The host decides when the game starts, so everybody follows the status
    watchLobby(gameId) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = setInterval(() => {
        this.refreshLobby(gameId).then((lobby) => {
          if (lobby && lobby.status === 'started') {
            this.goToGame(lobby);
          }
        });
      }, REFRESH_DELAY);
    },
    goToGame(lobby) {
      clearInterval(this.refreshInterval);
      forgetJoinedGame();
      this.$router.push({ name: 'Game', params: { gameName: lobby.name } });
    },
  },
  created() {
    if (this.host) {
      this.find();
      return;
    }
    // Coming back after a refresh: pick the game back up where it was left
    const joined = readJoinedGame();
    if (!joined) {
      return;
    }
    this.playerName = joined.name;
    this.refreshLobby(joined.gameId).then((lobby) => {
      if (!lobby) {
        forgetJoinedGame();
        return;
      }
      if (lobby.status === 'started') {
        this.goToGame(lobby);
        return;
      }
      this.watchLobby(lobby.game_id);
    });
  },
  destroyed() {
    clearInterval(this.refreshInterval);
  },
};
</script>

<style scoped lang="scss">
.join {
  padding: 20px 0 40px;
  .join__welcome {
    color: #4267b3;
  }
  .join__switch,
  .join__back {
    display: block;
    margin-top: 5px;
    text-decoration: underline;
    cursor: pointer;
  }
  .join__words {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    justify-content: center;
    max-height: 150px;
    overflow: auto;
    margin: 10px 0;
    /* readable on a phone held at arm's length */
    .tag {
      font-size: 1rem;
      height: 2em;
    }
  }
  .join__waiting {
    margin-top: 20px;
    font-style: italic;
  }
}
</style>
