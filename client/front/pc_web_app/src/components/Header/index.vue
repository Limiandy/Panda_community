<template>
  <div class="panda-header">
    <div class="layui-nav layui-clear">
      <ul class="panda-left">
        <li class="panda-logo layui-nav-item">
          <a href="#" class="brand">
            <img src="../../assets/images/logo-3.png" alt="" />
          </a>
        </li>
        <li class="layui-nav-item">
          <a href=""><i class="iconfont icon-jiaoliuweixuanzhong"></i>交流</a>
        </li>
        <li class="layui-nav-item">
          <a href=""><i class="iconfont icon-anli"></i>案例</a>
        </li>
        <li class="layui-nav-item">
          <a href=""><i class="iconfont icon-ui"></i>框架</a>
        </li>
      </ul>
      <div class="panda-right">
        <ul v-if="!isShow">
          <!-- 未登录状态 -->
          <li class="layui-nav-item">
            <a href="user/login.html"><i class="iconfont icon-robot"></i> </a>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <router-link to="Login">登录</router-link>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <router-link to="Register">注册</router-link>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a href=""><i class="iconfont icon-qq"></i></a>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a href=""><i class="iconfont icon-weibo"></i></a>
          </li>
        </ul>
        <ul v-else>
          <!-- 登入后的状态 -->
          <li class="layui-nav-item" @mouseover="show()" @mouseleave="hide()">
            <a class="panda-nav-avatar" href="javascript:;">
              <cite class="layui-hide-xs">{{ userInfo.nickName }}</cite>
              <i
                class="iconfont icon-renzheng layui-hide-xs"
                title="认证信息：layui 作者"
                v-if="userInfo.isVip !== '0'"
              ></i>
              <img :src="userInfo.pic" />
            </a>

            <dl
              class="layui-nav-child layui-anim layui-anim-upbit"
              :class="{ 'layui-show': isHover }"
            >
              <dd>
                <a href="user/set.html"
                  ><i class="layui-icon">&#xe620;</i>基本设置</a
                >
              </dd>
              <dd>
                <a href="user/message.html"
                  ><i class="layui-icon layui-icon-notice" style="top: 4px;"></i
                  >我的消息</a
                >
              </dd>
              <dd>
                <a href="user/home.html"
                  ><i
                    class="layui-icon"
                    style="margin-left: 2px; font-size: 22px;"
                    >&#xe68e;</i
                  >我的主页</a
                >
              </dd>
              <hr style="margin: 5px 0;" />
              <dd>
                <a href="/user/logout/" style="text-align: center;">退出</a>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
    </div>
  </div>
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
  computed: {
    isShow() {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.panda-header {
  width: 100%;
  height: 60px;
  // overflow: hidden;
}
.layui-nav {
  max-height: 60px;
}
.panda-left,
.panda-right {
  max-height: 60px;
}
.layui-nav-item {
  a {
    font-size: 18px;
    line-height: 60px;
    i {
      font-size: 22px;
      position: relative;
      top: 1px;
      right: 5px;
      line-height: 60px;
    }
  }
}
.brand {
  display: block;
  height: 60px;
  width: 120px;
  img {
    height: 100%;
  }
}

.panda-nav-avatar {
  cite {
    font-size: 22px;
    margin-right: 10px;
  }
  i {
    font-size: 14px !important;
    color: #ff5722;
  }
}
</style>
