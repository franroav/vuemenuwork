import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

/*{
    path: "/",
    redirect: "/home",
    name: "home",
    component: () => import( "../views/Home.vue"), },*/

const routes = [
  {
    path: "",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/SignIn.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../views/User.vue"),
  },
  {
    path: "/characters",
    name: "characters",
    component: () => import("../views/Characters.vue"),
  },
  {
    path: "/favorite",
    name: "favorite",
    component: () => import("../views/Favorite.vue"),
  },
  {
    path: "*",
    redirect: "/404",
  },
  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: () => import("../views/Error.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
