import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    linkExactActiveClass: "panda-active",
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
          import(
            /* webpackChunkName: "catalogs" */ "../views/channels/template1"
          )
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
      import(/* webpackChunkName: "forget" */ "../views/Forget/index.vue"),
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
      import(/* webpackChunkName: "register" */ "../views/Register/index.vue"),
    beforeEnter: (to, from, next) => {
      if (from.name === "Login") {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/usercenter",
    name: "UserCenter",
    component: () =>
      import(
        /* webpackChunkName: "usercenter" */ "../views/UserCenter/index.vue"
      ),
    children: [
      {
        path: "",
        name: "UserCtrl",
        component: () =>
          import(
            /* webpackChunkName: "UserCtrl" */ "../views/UserCenter/components/UserCtrl/index.vue"
          )
      },
      {
        path: "/usercenter/myhome",
        name: "MyHome",
        component: () =>
          import(
            /* webpackChunkName: "MyHome" */ "../views/UserCenter/components/MyHome/index.vue"
          )
      },
      {
        path: "/usercenter/productcenter",
        name: "ProductCenter",
        component: () =>
          import(
            /* webpackChunkName: "ProductCenter" */ "../views/UserCenter/components/ProductCenter/index.vue"
          )
      },
      {
        path: "/usercenter/mymessages",
        name: "MyMessages",
        component: () =>
          import(
            /* webpackChunkName: "MyMessages" */ "../views/UserCenter/components/MyMessages/index.vue"
          )
      },
      {
        path: "/usercenter/basicsettings",
        name: "BasicSettings",
        component: () =>
          import(
            /* webpackChunkName: "BasicSettings" */ "../views/UserCenter/components/BasicSettings/index.vue"
          )
      },
      {
        path: "/usercenter/mypost",
        name: "MyPost",
        component: () =>
          import(
            /* webpackChunkName: "MyPost" */ "../views/UserCenter/components/MyPost/index.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  // mode: "history",
  linkExactActiveClass: "panda-active",
  linkActiveClass: "layui-this",
  base: process.env.BASE_URL,
  routes
});

export default router;
