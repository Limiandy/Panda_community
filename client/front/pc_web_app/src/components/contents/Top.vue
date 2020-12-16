<template>
  <div v-show="lists.length > 0">
    <div class="breadcrumb text-middle">
      <a class="breadcrumb-item">置顶</a>
    </div>

    <list-item :lists="lists" :is-show="false"></list-item>
  </div>
</template>

<script>
import ListItem from "./ListItem";
import getList from "./mixin";
export default {
  name: "Top",
  components: {
    ListItem
  },
  mixins: [getList],
  data() {
    return {
      page: 0,
      limit: 20,
      lists: [],
      isTop: 1
    };
  }
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  width: 100%;
  height: 45px;
  position: relative;
}

.breadcrumb-item {
  display: inline-block;
  color: #ff5722 !important;
  margin-right: 15px;
}
</style>
