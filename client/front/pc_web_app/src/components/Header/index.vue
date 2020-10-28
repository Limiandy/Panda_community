<template>
  <div class="panda-header">
    <div class="layui-nav">
      <div class="panda-logo">
        <div class="layui-nav-item">
          <a href="#" class="brand">
            <img src="../../assets/images/logo-3.png" alt="" />
          </a>
        </div>
      </div>
      <ul class="panda-nav-list">
        <li class="layui-nav-item">
          <a href=""><i class="iconfont icon-jiaoliuweixuanzhong"></i>交流</a>
        </li>
        <li class="layui-nav-item">
          <a href=""><i class="iconfont icon-anli"></i>案例</a>
        </li>
        <li class="layui-nav-item">
          <a href=""><i class="iconfont icon-ui"></i>框架</a>
        </li>
        <li class="layui-nav-item">
          <router-link to="Login">登录</router-link>
        </li>
        <li class="layui-nav-item">
          <router-link to="Register">注册</router-link>
        </li>
        <li class="layui-nav-item">
          <a href=""><i class="iconfont icon-qq"></i></a>
        </li>
        <li class="layui-nav-item">
          <a href=""><i class="iconfont icon-weibo"></i></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="scss" scoped>
.panda-header {
  width: 100%;
  height: 60px;
  overflow: hidden;
}
.layui-nav {
  display: flex;
  justify-content: space-between;
}
.layui-nav-item {
  a {
    font-size: 18px;
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
  img {
    height: 100%;
  }
}
</style>
