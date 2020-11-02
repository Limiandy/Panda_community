<template>
  <div class="panda-panel">
    <h3 class="panda-panel-title">温馨通道</h3>
    <ul class="panda-panel-main layui-row">
      <li
        class="layui-col-md6 panda-tips-item"
        v-for="(item, index) in lists"
        :key="'tips' + index"
      >
        <a href="/jie/4281/" target="_blank">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { getTips } from "@/api/content";
export default {
  name: "Tips",
  data() {
    return {
      lists: []
    };
  },
  mounted() {
    getTips().then(res => {
      if (res.code === 200) {
        this.lists = res.data;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.panda-tips-item {
  border: 1px solid #999900;
  padding: 5px;
  text-align: center;
  &:nth-child(odd) {
    border-right: none;
  }
  &:nth-child(4) {
    border-top: none;
  }
  &:nth-child(3) {
    border-top: none;
  }
  a {
    color: #99ccff;
  }
}
</style>
