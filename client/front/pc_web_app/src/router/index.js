import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "",
        name: "Index",
        component: () =>
          import(/* webpackChunkName: "index" */ "../views/channels/index")
      },
      {
        path: "/index/:catalog",
        name: "Catalog",
        component: () =>
          import(/* webpackChunkName: "index" */ "../views/channels/template1")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login/index.vue")
  },
  {
    path: "/forget",
    name: "Forget",
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Forget/index.vue"),
    beforeEnter(to, from, next) {
      if (from.name === "Login") {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/register",
    name: "Register",
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Register/index.vue"),
    beforeEnter: (to, from, next) => {
      if (from.name === "Login") {
        next();
      } else {
        next("/login");
      }
    }
  }
];

const router = new VueRouter({
  // mode: "history",
  linkExactActiveClass: "panda-active",
  base: process.env.BASE_URL,
  routes
});

export default router;
