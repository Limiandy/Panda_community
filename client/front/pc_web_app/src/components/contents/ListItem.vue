<template>
  <div>
    <ul class="panda-list">
      <li v-for="(item, index) in items" :key="'listitem' + index">
        <a href="user/home.html" class="panda-avatar">
          <img :src="item.uid.pic" alt="头像" />
        </a>
        <h2>
          <a class="layui-badge">{{ item.catalog }}</a>
          <router-link :to="{ name: 'Detail', params: { tid: item._id } }">{{
            item.title
          }}</router-link>
        </h2>
        <div class="panda-list-info">
          <a href="user/home.html" class="panda-link">
            <i
              class="iconfont icon-isVip"
              :class="[
                { 'icon-vip0': item.uid.isVip === '0' },
                { 'icon-vip1': item.uid.isVip === '1' },
                { 'icon-vip2': item.uid.isVip === '2' },
                { 'icon-vip3': item.uid.isVip === '3' },
                { 'icon-vip4': item.uid.isVip === '4' },
                { 'icon-Vip': item.uid.isVip === '5' },
                { 'icon-vip6': item.uid.isVip === '6' },
                { 'icon-vip7': item.uid.isVip === '7' },
                { 'icon-vip8': item.uid.isVip === '8' },
                { 'icon-vip9': item.uid.isVip === '9' }
              ]"
            ></i>

            <span>{{ item.uid.nickName }}</span>
          </a>
          <span>{{ item.created | moment }}</span>

          <span class="panda-list-kiss layui-hide-xs" title="悬赏飞吻"
            ><i class="iconfont icon-like"></i> {{ item.fav }}</span
          >
          <span
            class="layui-badge panda-badge-accept layui-hide-xs"
            v-show="item.status !== '0'"
            >已结</span
          >
          <span class="panda-list-nums">
            <i class="iconfont icon-review" title="回答"></i> {{ item.answer }}
          </span>
        </div>
        <div
          class="panda-list-badge"
          v-show="item.tags.length > 0 && item.tags[0].name !== ''"
        >
          <span
            class="layui-badge"
            v-for="(tag, index) in item.tags"
            :key="'tag' + index"
            :class="tag.class"
            >{{ tag.name }}</span
          >
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
</style>
