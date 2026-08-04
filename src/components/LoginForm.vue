<template>
  <div class="login-form">
    <h3 class="login-form__title">
      {{ isRegistering ? 'Create an account' : 'Log in' }}
    </h3>
    <p class="help">
      Only needed to host a game your friends can join with your nickname.
    </p>
    <form v-on:submit.prevent="submit()">
      <input
        type="text"
        v-model="nickname"
        placeholder="Nickname"
        autocomplete="username"
      />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        autocomplete="current-password"
      />
      <button v-if="!isLoading" class="button is-link" type="submit">
        {{ isRegistering ? 'Create account' : 'Log in' }}
      </button>
      <button v-else class="button is-link is-loading" type="button">
        {{ isRegistering ? 'Create account' : 'Log in' }}
      </button>
    </form>
    <div v-if="error" class="help is-danger">{{ error }}</div>
    <a class="login-form__switch help" @click="isRegistering = !isRegistering">
      {{ isRegistering ? 'I already have an account' : 'I need an account' }}
    </a>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'LoginForm',
  data() {
    return {
      nickname: '',
      password: '',
      isRegistering: false,
    };
  },
  computed: {
    ...mapState({
      error: (state) => state.auth.error,
      isLoading: (state) => state.auth.isLoading,
    }),
  },
  methods: {
    ...mapActions({
      register: 'auth/register',
      logIn: 'auth/logIn',
    }),
    submit() {
      const credentials = { nickname: this.nickname.trim(), password: this.password };
      if (!credentials.nickname || !credentials.password) {
        return;
      }
      const logging = this.isRegistering ? this.register(credentials) : this.logIn(credentials);
      logging.then((session) => {
        if (session) {
          this.password = '';
          this.$emit('logged-in', session);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.login-form {
  .login-form__title {
    margin-bottom: 5px;
  }
  form {
    margin: 10px 0;
  }
  .login-form__switch {
    display: block;
    margin-top: 5px;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
