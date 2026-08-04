import Vue from 'vue';
import VueRouter from 'vue-router';
import Game from '@/views/Game.vue';
import Config from '@/views/Config.vue';
import Home from '@/views/Home.vue';
import Join from '@/views/Join.vue';
import Lobby from '@/views/Lobby.vue';
import WordConfig from '@/views/WordConfig.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/game/:gameName',
    name: 'Game',
    component: Game,
    props: true,
  },
  {
    path: '/config',
    name: 'Config',
    component: Config,
  },
  {
    // Where the host waits for his friends to join
    path: '/lobby',
    name: 'Lobby',
    component: Lobby,
  },
  {
    // Where the friends land, with or without the host's nickname in the link
    path: '/join/:hostNickname?',
    name: 'Join',
    component: Join,
    props: true,
  },
  {
    path: '/config/:wordName',
    name: 'WordConfig',
    component: WordConfig,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
