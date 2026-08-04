<template>
  <div class="home">
    <div class="">
      <img class="logo" src="@/assets/logo.png">
    </div>
    <br clear="all" />

    <div v-if="display" class="display">

          <router-link class="button is-link"
      :to="{ name: 'Config' }"> Start New Game
      </router-link>

      <div class="home__host">
        <div v-if="isLoggedIn">
          <p>Logged in as <strong>{{ nickname }}</strong></p>
          <router-link class="button is-link" :to="{ name: 'Lobby' }">
            Create a game your friends can join
          </router-link>
          <a class="home__logout help" @click="logOut()">Log out</a>
        </div>
        <LoginForm v-else />
      </div>

      <div class="home__friend">
        <input
          class="game-name"
          v-model="host"
          type="text"
          placeholder="Your host's nickname"
        >
        <router-link class="button is-link" :to="joinRoute">
          Join a friend's game
        </router-link>
      </div>

      <div class= "join-game">
        <input class="game-name" v-model="gameName" type="text" placeholder="Enter Game Name">
          <router-link class="button is-link"
      :to="{ name: 'Game', params: { gameName} }"> Join existing Game
        </router-link>
        <div class="home__config">
          <h3 class="home__config-title"> Edit existing dictionary of words (WIP)</h3>
          <div id="dictionary-selection">
            <select v-model="selected" class="select is-medium edit-selection">
              <option
                v-for="dictionaryName in dictionnaryList"
                :key="dictionaryName"
              >
                {{ dictionaryName }}
              </option>
            </select>
            <router-link
              class="button is-link"
              :to="{ name: 'WordConfig', params: { wordName: selected } }"
            >
              Edit List
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="display">
        <button class="button is-link is-loading">Start</button>
        <p>Waking up the server</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import LoginForm from '@/components/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      gameName: '',
      host: '',
      dictionnaryList: [],
      selected: null,
    };
  },

  computed: {
    ...mapState({
      isBackUp: (state) => state.isBackUp,
      nickname: (state) => state.auth.nickname,
    }),
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
    }),
    display() {
      return this.isBackUp;
    },
    // Without a nickname the join page asks for one itself
    joinRoute() {
      const host = this.host.trim();
      return host ? { name: 'Join', params: { hostNickname: host } } : { name: 'Join' };
    },
  },

  methods: {
    ...mapActions({
      wakeUpBack: 'wakeUpBack',
      logOut: 'auth/logOut',
    }),
    ...mapGetters({
      wordsListNames: 'words/wordsListNames',
    }),
  },
  created() {
    this.wakeUpBack();
    const initialIndex = 0;
    this.dictionnaryList = this.wordsListNames();
    this.selected = this.dictionnaryList[initialIndex];
  },
};
</script>

<style lang="scss">
/* the menu flows under the logo: with the login it is too tall to be centered
   on top of it */
.display{
  width: 90%;
  max-width: 700px;
  margin: 0 auto 40px;
}
.home {
  .home__join {
    margin-top: 20px;
  }
  .home__host {
    margin-top: 20px;
  }
  .home__logout {
    display: block;
    margin-top: 5px;
    text-decoration: underline;
    cursor: pointer;
  }
  .home__friend {
    margin-top: 20px;
  }
  .home__config {
    margin-top: 20px;
    .home__config-title {
      margin-bottom: 10px;
    }
  }
}
.edit-selection {
  height:2.5rem !important;
  width:40%;
  margin-right: 1rem;
}
.logo{
  max-height:35vh;
}
</style>
