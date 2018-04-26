import Vue from "vue";
import Router from "vue-router";
import Workers from "./views/Workers.vue";
import Jobs from "./views/Jobs.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "workers",
      component: Workers
    },
    {
      path: "/jobs",
      name: "jobs",
      component: Jobs
    }
  ]
});
