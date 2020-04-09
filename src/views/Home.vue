<template>
  <div class="home">
    <div class="container">

      <img class="logo" src="@/assets/logo.png">
      <div v-if="display">

            <router-link class="display button is-link"
        :to="{ name: 'Config' }"> Start
        </router-link>
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
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
