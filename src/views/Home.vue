<template>
  <div class="home">
    <img class="logo" src="@/assets/logo.png" />
    <div v-if="display" class="display">
      <router-link class="button is-link" :to="{ name: 'Config' }">
        Start New Game
      </router-link>
      <div class="home__join">
        <input
          class="game-name"
          v-model="gameName"
          type="text"
          placeholder="Enter Game Name"
        />
        <router-link
          class="button is-link"
          :to="{ name: 'Game', params: { gameName } }"
        >
          Join existing Game
        </router-link>
      </div>
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

export default {
  data() {
    return {
      gameName: '',
      dictionnaryList: ['test'],
      selected: null,
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
    const initialIndex = 0;
    this.selected = this.dictionnaryList[initialIndex];
  },
};
</script>

<style lang="scss">
.display {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.home {
  .home__join {
    margin-top: 20px;
  }
  .home__config {
    margin-top: 20px;
    .home__config-title {
      margin-bottom: 10px;
    }
  }
}

.game-name {
  width: 40%;
}

.edit-selection {
  height: 2.5rem !important;
  width: 40%;
  margin-right: 5px;
}
.logo {
  max-height: 35vh;
}
</style>
