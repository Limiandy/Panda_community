<template>
  <dl class="panda-panel panda-list-one">
    <dt class="panda-panel-title">本周热议</dt>
    <dd v-for="(item, index) in lists" :key="'top' + index">
      <a href="jie/detail.html">基于 layui 的极简社区页面模版</a>
      <span><i class="iconfont icon-pinglun1"></i> 16</span>
    </dd>

    <!-- 无数据时 -->

    <div v-if="lists.length < 1" class="panda-none">没有相关数据</div>
  </dl>
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
.panda-none {
  min-height: 76px;
  padding: 5px;
  padding-left: 15px;
}
</style>
