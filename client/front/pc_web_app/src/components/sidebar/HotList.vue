<template>
  <div class="layui-card">
    <div class="layui-card-header">本周热议</div>
    <div class="layui-card-body">
      <dd v-for="(item, index) in lists" :key="'top' + index">
        <router-link
          :to="{ name: 'Detail', params: { tid: item._id } }"
          class="host-title"
          >{{ item.title }}</router-link
        >
        <span><i class="iconfont icon-review"></i>{{ item.answer }}</span>
      </dd>
    </div>

    <!-- 无数据时 -->

    <div v-if="lists.length < 1" class="panda-none">没有相关数据</div>
  </div>
</template>

<script>
import { getTopWeek } from "@/api/content";
export default {
  name: "HotList",
  data() {
    return {
      lists: []
    };
  },
  mounted() {
    getTopWeek().then(res => {
      if (res.code === 200) {
        this.lists = res.data;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
dd {
  position: relative;
  span {
    position: absolute;
    right: 2px;
    i {
      font-size: 13px;
      margin-right: 5px;
    }
  }
}
.host-title {
  color: #000;
}
</style>
