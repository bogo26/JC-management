import Vue from 'vue';
import Router from 'vue-router';
import Workers from './views/Workers.vue';
import Jobs from './views/Jobs.vue';
import Wages from './views/Wages.vue';
import dailyRaport from './views/DailyRaport.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'workers',
      component: Workers,
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: Jobs,
    },
    {
      path: '/wages',
      name: 'wages',
      component: Wages,
    },
    {
      path: '/dailyRaport',
      name: 'dailyRaport',
      component: dailyRaport,
    },
  ],
});
