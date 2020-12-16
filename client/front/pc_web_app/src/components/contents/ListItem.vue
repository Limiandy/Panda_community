<template>
  <div>
    <ul class="list-boxes">
      <li
        class="media"
        v-for="(item, index) in lists"
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
            <div class="layui-badge">{{ item.catalog }}</div>
            <h2 class="f-s-14 f-w-700">{{ item.title }}</h2>
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
              <a href="javascript:void(0)" class="user-info">
                <i class="iconfont vipTag" :class="getVip(item.uid.isVip)"></i>
                <span class="user-nick">{{ item.uid.nickName }}</span>
              </a>
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
import moment from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
moment.extend(relativeTime);
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
            break;
          case "share":
            item.catalog = "分享";
            break;
          case "logs":
            item.catalog = "动态";
            break;
          case "notice":
            item.catalog = "公告";
            break;
          case "advise":
            item.catalog = "建议";
            break;
          case "discuss":
            item.catalog = "交流";
            break;
        }
      });
      return this.lists;
    }
  },
  methods: {
    more() {
      this.$emit("nextpage");
    },
    getVip(vip) {
      return `icon-vip${vip}`;
    }
  },
  filters: {
    moment(date) {
      if (moment(date).isBefore(moment().subtract(7, "days"))) {
        return moment(date).format("YYYY-MM-DD");
      } else {
        return moment(date)
          .locale("zh-cn")
          .from(moment());
      }
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
</style>
