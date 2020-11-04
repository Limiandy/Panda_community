<template>
  <div class="post-wrap">
    <ul class="layui-tab-title">
      <li
        :class="{ 'layui-this': popName === 'post-publish' }"
        @click="checkhandle(1)"
      >
        我的发帖
      </li>
      <li
        :class="{ 'layui-this': popName === 'post-collection' }"
        @click="checkhandle(2)"
      >
        我收藏的帖
      </li>
    </ul>
    <div class="layui-tab-content">
      <keep-alive>
        <component :is="popName"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyPost",
  components: {
    "post-publish": () => import("./MyPublish"),
    "post-collection": () => import("./MyCollection")
  },
  data() {
    return {
      popName: "post-publish"
    };
  },
  mounted() {
    const tabName = this.$route.params.tabName;
    if (tabName && tabName === "publish") {
      this.popName = "post-publish";
    }
    if (tabName && tabName === "collection") {
      this.popName = "post-collection";
    }
  },
  methods: {
    checkhandle(v) {
      if (v === 1) {
        this.popName = "post-publish";
      }
      if (v === 2) {
        this.popName = "post-collection";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.post-wrap {
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
}
.layui-tab-content {
  box-sizing: border-box;
  height: 631px;
}
</style>
