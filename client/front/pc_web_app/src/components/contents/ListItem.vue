<template>
  <div>
    <ul class="list-boxes">
      <li
        class="media"
        v-for="(item, index) in items"
        :key="'listItem' + index"
      >
        <a href="javascript:void(0)" class="media-avatar">
          <img
            :src="item.uid.pic === '' ? '/header-k.jpg' : item.uid.pic"
            alt="头像"
          />
        </a>
        <div class="media-body">
          <div class="media-heading">
            <div class="layui-badge" :class="item.cataClass">
              {{ item.catalog }}
            </div>
            <h2 class="f-s-14 f-w-700">
              <router-link
                class="post-title"
                :to="{ name: 'Detail', params: { tid: item._id } }"
                >{{ item.title }}</router-link
              >
            </h2>
            <div
              class="layui-badge"
              v-for="(tag, index) in item.tags"
              :key="'tag' + index"
              :class="tag.class"
              style="margin-left: 5px;"
              v-show="tag.name"
            >
              {{ tag.name }}
            </div>
          </div>
          <div class="media-content">
            <div class="media-user text-middle">
              <router-link
                :to="{ name: 'MyHome', params: { uid: item.uid._id } }"
                class="user-info"
              >
                <i
                  class="iconfont vipTag"
                  :class="'icon-vip' + item.uid.isVip"
                ></i>
                <span class="user-nick">{{ item.uid.nickName }}</span>
              </router-link>
              <a href="javascript:void(0)" class="post-date">{{
                item.created | moment
              }}</a>
            </div>
            <div class="media-info text-middle">
              <span class="comment-count">
                <i class="iconfont icon-review" style="font-size: 14px"></i>
                {{ item.answer }}
              </span>
              <span class="read-count">
                <i
                  class="iconfont icon-chakan"
                  style="position: relative; top:1px;"
                ></i>
                {{ item.reads }}
              </span>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div style="text-align: center" v-show="isShow">
      <div class="laypage-main" v-if="!isEnd">
        <a href="" class="laypage-next" @click.prevent="more()">更多求解</a>
      </div>
      <div class="no-more gray" v-else>
        没有更多了
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "ListItem",
  props: {
    lists: {
      type: Array,
      default: () => []
    },
    isShow: {
      type: Boolean,
      default: true
    },
    isEnd: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    items() {
      _.map(this.lists, item => {
        switch (item.catalog) {
          case "ask":
            item.catalog = "提问";
            item.cataClass = "layui-bg-green";
            break;
          case "share":
            item.catalog = "分享";
            item.cataClass = "";
            break;
          case "logs":
            item.catalog = "动态";
            item.cataClass = "layui-bg-cyan";
            break;
          case "notice":
            item.catalog = "公告";
            item.cataClass = "layui-bg-orange";
            break;
          case "advise":
            item.catalog = "建议";
            item.cataClass = "layui-bg-blue";
            break;
          case "discuss":
            item.catalog = "交流";
            item.cataClass = "layui-bg-black";
            break;
        }
      });
      return this.lists;
    }
  },
  methods: {
    more() {
      this.$emit("nextpage");
    }
  }
};
</script>

<style lang="scss" scoped>
.no-more {
  padding: 20px 0;
}
.gray {
  color: #999;
}
.post-date {
  margin-left: 10px;
  color: #c2c2c2;
}
.vipTag {
  color: #ffb800;
}
.read-count {
  margin-left: 5px;
}
.post-title {
  color: #333;
}
</style>
