import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import Home from "../views/Home";
import jwt from "jsonwebtoken";
import moment from "dayjs";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        path: "",
        name: "Home",
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
    path: "/confirm",
    name: "Confirm",
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Confirm" */ "../views/Confirm/index.vue")
  },
  {
    path: "/reset",
    name: "Reset",
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Reset/index.vue")
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
    path: "/add",
    name: "Add",
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Add" */ "../components/contents/Add.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/detail/:tid",
    name: "Detail",
    props: true,
    component: () =>
      import(/* webpackChunkName: "Detail" */ "../components/contents/Detail")
  },
  {
    path: "/myhome",
    name: "MyHome",
    component: () =>
      import(
        /* webpackChunkName: "MyHome" */ "../views/UserCenter/components/MyHome/index.vue"
      )
  },
  {
    path: "/usercenter",
    component: () =>
      import(
        /* webpackChunkName: "usercenter" */ "../views/UserCenter/index.vue"
      ),
    meta: { requiresAuth: true },
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
        path: "/usercenter/basicsettings/:tName?",
        name: "BasicSettings",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "BasicSettings" */ "../views/UserCenter/components/BasicSettings/index.vue"
          )
      },
      {
        path: "/usercenter/mypost",
        name: "MyPost",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "MyPost" */ "../views/UserCenter/components/MyPost/index.vue"
          )
      }
    ]
  },
  {
    path: "/404",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "404" */ "../views/404/index.vue")
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  // mode: "history",
  linkActiveClass: "layui-this",
  linkExactActiveClass: "layui-this",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = localStorage.getItem("token");
  if (token && token !== "" && token !== null) {
    const payload = jwt.decode(token);
    if (moment().isBefore(moment(payload.exp * 1000))) {
      // token 有效期一般设置为8-24小时，refresh token 用于用户token过期后，前端携带这个token在次向服务器发起请求，一般有效期为一个月
      store.commit("setToken", token);
      store.commit("setUserInfo", userInfo);
      store.commit("setLogin", true);
    } else {
      localStorage.clear();
    }
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    const isLogin = store.state.isLogin;
    if (isLogin) {
      // 表示已登录
      next();
    } else {
      // 未登录
      next("/login");
    }
  } else {
    // 不需要鉴权的页面
    next(); // 确保一定要调用 next()
  }
});

export default router;
