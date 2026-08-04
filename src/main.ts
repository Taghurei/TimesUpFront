import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store/index';

Vue.config.productionTip = false;

// Picks up the login from a previous visit, when there is one
store.dispatch('auth/restoreSession');

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
