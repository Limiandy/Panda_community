import Header from '@/components/Header';
<template>
  <div class="user-ctrl-wrap">
    <header class="user-ctrl-header panda-panel">
      <h3>
        Hi,<span class="user-nick-name">{{
          this.$store.state.userInfo.nickName
        }}</span
        >,你已是我们的正式会员
      </h3>
    </header>
    <div class="user-information-panel layui-row layui-col-space20">
      <div class="layui-card layui-col-md6">
        <div class="layui-card-header">我的会员信息</div>
        <div class="layui-card-body">
          <p>积分经验值：{{ this.$store.state.userInfo.favs }}</p>
          <p>你当前为：vip{{ this.$store.state.userInfo.isVip }}</p>
        </div>
      </div>
      <div class="layui-col-md6">
        <sign />
      </div>
    </div>
    <hr class="layui-bg-gray" />
    <div class="shortcuts">
      <header class="panda-panel">
        快捷方式
      </header>
      <ul class="shortcut-lists layui-row layui-col-space20">
        <router-link
          tag="li"
          :to="{ name: item.path }"
          class="shortcut-list-item layui-col-xs4 layui-col-sm3"
          v-for="(item, index) in lists"
          :key="'shortcut' + index"
        >
          <a class="layui-icon layui-bg-cyan" :class="item.icon"></a>
          <span>{{ item.title }}</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import sign from "@/components/sidebar/Sign";
export default {
  name: "UserCtrl",
  components: {
    sign
  },
  data() {
    return {
      lists: [
        {
          title: "修改信息",
          icon: "layui-icon-engine",
          path: ""
        },
        {
          title: "修改头像",
          icon: "layui-icon-engine",
          path: ""
        },
        {
          title: "修改密码",
          icon: "layui-icon-engine",
          path: ""
        },
        {
          title: "账号绑定",
          icon: "layui-icon-engine",
          path: ""
        },
        {
          title: "修改信息",
          icon: "layui-icon-engine",
          path: ""
        },
        {
          title: "修改信息",
          icon: "layui-icon-engine",
          path: ""
        },
        {
          title: "修改信息",
          icon: "layui-icon-engine",
          path: ""
        },
        {
          title: "修改信息",
          icon: "layui-icon-engine",
          path: ""
        },
        {
          title: "修改信息",
          icon: "layui-icon-engine",
          path: ""
        },
        {
          title: "修改信息",
          icon: "layui-icon-engine",
          path: ""
        },
        {
          title: "修改信息",
          icon: "layui-icon-engine",
          path: ""
        },
        {
          title: "修改信息",
          icon: "layui-icon-engine",
          path: ""
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.user-ctrl-wrap {
  padding-top: 15px;
}
.user-ctrl-header {
  padding: 10px;
  .user-nick-name {
    color: #ff3300;
  }
}
.user-basic-information {
  overflow: hidden;
  height: 152px;
  header {
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: 1px dotted #e9e9e9;
    box-shadow: 1px 0 1px rgba($color: #000000, $alpha: 0.1);
    margin: 0;
  }
  div {
    height: 86px;
    padding: 5px;
    box-sizing: border-box;
    box-shadow: 1px 1px 2px rgba($color: #000000, $alpha: 0.1);
    p {
      margin-top: 12px;
    }
  }
}
.shortcuts {
  width: 100%;
  height: 100%;
  header {
    height: 40px;
    padding: 0 10px;
  }
  .shortcut-lists {
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
  }
}
.shortcut-list-item {
  a {
    display: block;
    width: 100%;
    height: 62px;
    line-height: 62px;
    text-align: center;
    font-size: 28px;
    border-radius: 5px;
  }
  span {
    display: block;
    text-align: center;
    width: 100%;
    margin-top: 5px;
  }
}
</style>
