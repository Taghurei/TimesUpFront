<template>
  <div class="container lobby">
    <div v-if="lobby">
      <h1>Your game is open</h1>
      <div class="lobby__share">
        <p>Your friends join with your nickname:</p>
        <h2 class="lobby__nickname">{{ nickname }}</h2>
        <p class="help">
          They open the app, click "Join a friend's game" and type it.
        </p>
        <p class="help">Or send them this link: {{ joinLink }}</p>
      </div>

      <LobbyTeams :players="lobby.players" />

      <div v-if="!hasJoined" class="lobby__join">
        <div class="title">Join your own game</div>
        <input type="text" v-model="playerName" placeholder="Your name" />
        <button class="button" @click="join('team1')">Team A</button>
        <button class="button" @click="join('team2')">Team B</button>
      </div>
      <p v-else class="help">
        You are playing as <strong>{{ playerName }}</strong>
      </p>

      <div class="title">Words</div>
      <p>{{ lobby.words.length }} word(s) in the pool</p>
      <div class="lobby__words">
        <span class="tag is-link" v-for="word in lobby.words" :key="word">
          {{ word }}
        </span>
      </div>
      <WordPicker :existingWords="lobby.words" @add-words="addWords" />

      <div class="timer">
        <div class="title">Timer</div>
        <input type="number" v-model="timer" /> seconds per round
      </div>

      <div v-if="lobbyError" class="help is-danger">{{ lobbyError }}</div>
      <button v-if="!isStarting" class="button is-link" @click="start()">
        Start Game
      </button>
      <button v-else class="button is-link is-loading">Start Game</button>
    </div>
    <div v-else class="lobby__loading">
      <a class="button is-loading is-link">Loading</a>
      <p v-if="lobbyError" class="help is-danger">{{ lobbyError }}</p>
      <p v-else>Opening your game</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import LobbyTeams from '@/components/LobbyTeams.vue';
import WordPicker from '@/components/WordPicker.vue';

// The host does not act on the lobby, so it is polled to see the others arrive
const REFRESH_DELAY = 2000;

export default {
  name: 'Lobby',
  components: {
    LobbyTeams,
    WordPicker,
  },
  data() {
    return {
      playerName: '',
      timer: 30,
      isStarting: false,
      refreshInterval: null,
    };
  },
  computed: {
    ...mapState({
      lobby: (state) => state.games.lobby,
      lobbyError: (state) => state.games.lobbyError,
      nickname: (state) => state.auth.nickname,
    }),
    joinLink() {
      return `${window.location.origin}/join/${this.nickname}`;
    },
    allPlayers() {
      if (!this.lobby) {
        return [];
      }
      return this.lobby.players.team1.concat(this.lobby.players.team2);
    },
    hasJoined() {
      return this.allPlayers.some((player) => player.name === this.playerName);
    },
  },
  methods: {
    ...mapActions({
      createLobby: 'games/createLobby',
      refreshLobby: 'games/refreshLobby',
      addLobbyWords: 'games/addLobbyWords',
      joinLobby: 'games/joinLobby',
      startLobby: 'games/startLobby',
    }),
    join(team) {
      const name = this.playerName.trim();
      if (!name) {
        return;
      }
      this.playerName = name;
      this.joinLobby({ gameId: this.lobby.game_id, name, team });
    },
    addWords(words) {
      this.addLobbyWords({ gameId: this.lobby.game_id, words });
    },
    start() {
      this.isStarting = true;
      this.startLobby({
        gameId: this.lobby.game_id,
        // eslint-disable-next-line
        timer: parseInt(this.timer),
      }).then((game) => {
        this.isStarting = false;
        if (game && game.status === 'started') {
          this.$router.push({ name: 'Game', params: { gameName: game.name } });
        }
      });
    },
  },
  created() {
    if (!this.nickname) {
      this.$router.push({ name: 'Home' });
      return;
    }
    this.playerName = this.nickname;
    this.createLobby(this.timer).then((lobby) => {
      if (!lobby) {
        return;
      }
      this.timer = lobby.timer;
      this.refreshInterval = setInterval(() => {
        this.refreshLobby(lobby.game_id);
      }, REFRESH_DELAY);
    });
  },
  destroyed() {
    clearInterval(this.refreshInterval);
  },
};
</script>

<style scoped lang="scss">
.lobby {
  padding: 20px 0 40px;
  .lobby__nickname {
    color: #4267b3;
    font-weight: bold;
  }
  .lobby__share {
    margin-bottom: 20px;
  }
  .lobby__join {
    margin: 20px 0;
  }
  .lobby__words {
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
  .lobby__loading {
    transform: translateY(100%);
  }
}
</style>
