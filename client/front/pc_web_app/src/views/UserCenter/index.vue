<template>
  <div class="user-center layui-container">
    <!-- 侧边导航 -->
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
      <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
      <router-link
        :to="{ name: item.path }"
        exact
        class="layui-nav-item layui-nav-itemed"
        v-for="(item, index) in navLists"
        :key="'usernav' + index"
      >
        <a href="javascript:;"
          ><i class="layui-icon" :class="item.icon"></i>{{ item.name }}</a
        >
      </router-link>
    </ul>
    <div class="user-center-wrap">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCenter",
  data() {
    return {
      navLists: [
        {
          name: "我的主页",
          icon: "layui-icon-home",
          path: "MyHome"
        },
        {
          name: "用户中心",
          icon: "layui-icon-user",
          path: "UserCtrl"
        },
        {
          name: "产品中心",
          icon: "layui-icon-tabs",
          path: "ProductCenter"
        },
        {
          name: "我的消息",
          icon: "layui-icon-reply-fill",
          path: "MyMessages"
        },
        {
          name: "基本设置",
          icon: "layui-icon-set-fill",
          path: "BasicSettings"
        },
        {
          name: "我的帖子",
          icon: "layui-icon-file",
          path: "MyPost"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.user-center {
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
  flex-wrap: nowrap;
}
.layui-nav-tree {
  min-height: 681px;
}
.layui-icon {
  margin-right: 10px;
}
.user-center-wrap {
  margin-left: 10px;
  background-color: #fff;
  width: 100%;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba($color: #000000, $alpha: 0.05);
}
</style>
