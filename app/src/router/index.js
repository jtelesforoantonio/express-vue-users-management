import Vue from 'vue';
import VueRouter from 'vue-router';
import userRoutes from "./user";

Vue.use(VueRouter);

const routes = [
  ...userRoutes,
  {
    path: '*',
    redirect: {
      name: 'users.index'
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
