<template>
  <div class="home">
      <h1>
      Welcome to this Times'Up
      </h1>
    <div v-if="display">

          <router-link class="button is-link"
      :to="{ name: 'Config' }"> Start
      </router-link>
    </div>
    <div v-else>
      <button class="button is-link is-loading">Start</button>
      <p>
        Waking up the server
      </p>
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
