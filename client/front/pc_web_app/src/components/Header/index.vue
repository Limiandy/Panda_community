<template>
  <nav class="layui-nav layui-bg-green">
    <ul class="nav-group">
      <li class="layui-nav-item brand">
        <a href="javascript:void(0)">
          <img src="../../assets/images/logo-3.png" alt="品牌标志" />
        </a>
      </li>
      <li class="layui-nav-item">
        <a href="javascript:void(0)"
          ><i class="iconfont icon-anli1"></i> 案例</a
        >
      </li>
      <li class="layui-nav-item">
        <a href="javascript:void(0)"
          ><i class="iconfont icon-kuangjia"></i> 框架</a
        >
      </li>
      <li class="layui-nav-item">
        <router-link
          :to="{ name: 'Home' }"
          exact-active-class=""
          active-class=""
          ><i class="iconfont icon-shequ"></i> 社区</router-link
        >
      </li>
    </ul>
    <!-- 未登录 -->
    <ul class="nav-group" v-if="!isLogin">
      <li class="layui-nav-item">
        <router-link to="Login" active-class="" exact-active-class=""
          >登录</router-link
        >
      </li>
      <li class="layui-nav-item">
        <router-link
          :to="{ name: 'Register' }"
          exact-active-class=""
          active-class=""
          >注册</router-link
        >
      </li>
    </ul>

    <!-- 已登录 -->
    <ul class="nav-group" v-else>
      <li class="layui-nav-item">
        <router-link
          :to="{ name: 'MyMessages' }"
          active-class=""
          exact-active-class=""
          >我的消息<span class="layui-badge">9</span></router-link
        >
      </li>
      <li class="layui-nav-item">
        <router-link
          :to="{ name: 'UserCtrl' }"
          active-class=""
          exact-active-class=""
          >个人中心<span class="layui-badge-dot"></span
        ></router-link>
      </li>
      <li class="layui-nav-item" @mouseover="show" @mouseleave="hide">
        <a href="javascript:void(0)"
          ><img
            :src="userInfo.pic ? userInfo.pic : '/header-k.jpg'"
            alt="用户头像"
            class="layui-nav-img"/>{{ userInfo.nickName
          }}<span
            class="layui-nav-more"
            :class="{ 'layui-nav-mored': isHover }"
          ></span
        ></a>
        <dl
          class="layui-nav-child layui-anim layui-anim-upbit"
          :class="{ 'layui-show': isHover }"
        >
          <dd>
            <router-link
              :to="{ name: 'MyHome' }"
              exact-active-class=""
              active-class=""
              >我的主页</router-link
            >
          </dd>
          <dd>
            <router-link
              :to="{ name: 'BasicSettings' }"
              exact-active-class=""
              active-class=""
              >修改信息</router-link
            >
          </dd>

          <dd><a href="javascript:void(0)" @click="logout">安全退出</a></dd>
        </dl>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isHover: false,
      hoverCtrl: {}
    };
  },
  mounted() {
    window.vue = this;
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    show() {
      clearTimeout(this.hoverCtrl);
      this.hoverCtrl = setTimeout(() => {
        this.isHover = true;
      }, 200);
    },
    hide() {
      clearTimeout(this.hoverCtrl);
      this.hoverCtrl = setTimeout(() => {
        this.isHover = false;
      }, 500);
    },
    logout() {
      this.$confirm(
        "确定退出吗？",
        () => {
          localStorage.clear();
          this.$store.commit("setToken", "");
          this.$store.commit("setUserInfo", "");
          this.$store.commit("setLogin", false);
          if (this.$route.path !== "/") {
            this.$router.push("/");
          } else {
            this.$router.go(0);
          }
        },
        () => {}
      );
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
.layui-nav {
  height: 60px;
}
.nav-group {
  height: 100%;
}
.brand {
  height: 100%;
  a {
    height: 100%;
    width: 100%;
    img {
      display: block;
      height: 100%;
    }
  }
}
.layui-nav-child {
  text-align: center;
}
</style>
