<template>
  <div class="home">
    <div class="container">

      <img class="logo" src="@/assets/logo.png">
      <div v-if="display" class="display">

            <router-link class="button is-link"
        :to="{ name: 'Config' }"> Start New Game
        </router-link>
        <div class= "join-game">
          <input class="game-name" v-model="gameName" type="text" placeholder="Enter Game Name">
            <router-link class="button is-link"
        :to="{ name: 'Game', params: { gameName} }"> Join existing Game
        </router-link>
        </div>
        </div>
      <div v-else>
        <div class="display">
        <button class="button is-link is-loading">Start</button>
        <p>
          Waking up the server
        </p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      gameName: '',
    };
  },

  computed: {
    ...mapState({
      isBackUp: (state) => state.isBackUp,
    }),
    display() {
      return this.isBackUp;
    },
  },

  methods: {
    ...mapActions({
      wakeUpBack: 'wakeUpBack',
    }),
  },
  created() {
    this.wakeUpBack();
  },
};
</script>

<style>
.display{
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.join-game{
    margin-top: 5%;
}
  .game-name{
    width:40%;
  }
</style>
