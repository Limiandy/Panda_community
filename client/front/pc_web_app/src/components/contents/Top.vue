import ListItem from '@/components/contents/ListItem';
<template>
  <div class="panda-panel" v-show="lists.length > 0">
    <div class="panda-panel-title panda-filter">
      <a>置顶</a>
      <a
        href="#signin"
        class=" layui-show-xs-block panda-right"
        style="color: #FF5722;"
        >去签到</a
      >
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

<style scoped></style>
