<template>
  <div class="panel">
    <div class="layui-container">
      <ul>
        <router-link
          tag="li"
          :to="{ name: 'Home' }"
          class="layui-hide-xs"
          exact
        >
          <a>首页</a>
        </router-link>
        <router-link
          tag="li"
          exact
          v-for="(item, index) in lists"
          :key="'panel' + index"
          :to="item.path"
          :class="{
            'layui-hide-xs':
              index === lists.length || index === lists.length - 1
          }"
        >
          <a>
            {{ item.name }}
            <span v-if="item.isNew" class="layui-badge-dot"></span>
          </a>
        </router-link>
        <li class="layui-hide-xs"><span class="line"></span></li>

        <!-- 用户登录后显示 -->
        <template v-if="isLogin">
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <router-link
              :to="{ name: 'MyPost', params: { tabName: 'publish' } }"
              >我发表的文章</router-link
            >
          </li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <router-link
              :to="{ name: 'MyPost', params: { tabName: 'collection' } }"
              >我收藏的文章</router-link
            >
          </li>
        </template>
      </ul>
      <div class="right layui-hide-xs">
        <span><i class="layui-icon layui-icon-search"></i></span>
        <router-link
          :to="{ name: 'Add' }"
          tag="button"
          class="layui-btn layui-btn"
          >发表新帖</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Panel",
  data() {
    return {
      lists: [
        {
          name: "提问",
          path: "/index/ask",
          isNew: false
        },
        {
          name: "分享",
          path: "/index/share",
          isNew: true
        },
        {
          name: "讨论",
          path: "/index/discuss",
          isNew: false
        },
        {
          name: "建议",
          path: "/index/advise",
          isNew: false
        },
        {
          name: "公告",
          path: "/index/notice",
          isNew: false
        },
        {
          name: "动态",
          path: "/index/news",
          isNew: false
        },
        {
          name: "",
          path: "",
          isNew: false
        }
      ],
      isLogin: this.$store.state.isLogin
    };
  }
};
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .panel {
    height: auto !important;
  }
  ul {
    li {
      width: 33.33%;
    }
  }
}
.panel {
  position: relative;
  height: 50px;
  line-height: 50px;
  margin-bottom: 15px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  .layui-this {
    a {
      color: #5fb878;
    }
  }
}
ul {
  li {
    display: inline-block;
    a {
      padding: 0 20px 0 0;
      color: #000000;
      &:hover {
        color: #5eb878;
      }
    }
  }
  .line {
    display: inline-block;
    height: 20px;
    width: 1px;
    background-color: #e2e2e2;
    vertical-align: middle;
    margin: 0 20px;
  }
}
.right {
  height: 50px;
  line-height: 50px;
  position: absolute;
  right: 14px;
  top: 0;
  .layui-icon-search {
    margin-right: 15px;
    font-size: 20px;
    &:hover {
      color: #5fb878;
      cursor: pointer;
    }
  }
  .layui-btn {
    position: relative;
    top: -4px;
  }
}
</style>
