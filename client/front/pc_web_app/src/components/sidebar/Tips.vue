<template>
  <div class="layui-card">
    <h3 class="layui-card-header">温馨通道</h3>
    <ul class="layui-card-body">
      <li
        v-for="(item, index) in lists"
        :key="'tips' + index"
      >
        <a :href="item.link" target="_blank" class="text-middle">
          <span class="tips-title f-w-600">{{ item.title }}</span>
          <p class="tips-desc">{{ item.desc }}</p>
        </a>
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
.tips-title {
  color: #ff5722;
}
.tips-desc {
  color: #ccc;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
