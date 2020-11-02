<template>
  <div class="panda-panel" style="margin-bottom: 0;">
    <div class="panda-panel-title panda-filter">
      <a
        :class="{ 'layui-this': status === '' && tag === '' }"
        @click.prevent="search()"
        >综合</a
      >
      <span class="panda-mid"></span>
      <a :class="{ 'layui-this': status === '0' }" @click.prevent="search(0)"
        >未结</a
      >
      <span class="panda-mid"></span>
      <a :class="{ 'layui-this': status === '1' }" @click.prevent="search(1)"
        >已结</a
      >
      <span class="panda-mid"></span>
      <a
        :class="{ 'layui-this': status === '' && tag === '精华' }"
        @click.prevent="search(2)"
        >精华</a
      >
      <span class="panda-filter-right layui-hide-xs">
        <a
          :class="{ 'layui-this': sort === 'created' }"
          @click.prevent="search(3)"
          >按最新</a
        >
        <span class="panda-mid"></span>
        <a
          :class="{ 'layui-this': sort === 'answer' }"
          @click.prevent="search(4)"
          >按热议</a
        >
      </span>
    </div>

    <list-item :lists="lists" @nextpage="nextPage()" :is-end="isEnd" />
  </div>
</template>

<script>
import ListItem from "@/components/contents/ListItem";
// import { getList } from "@/api/content";
import getList from "./mixin";
export default {
  name: "List",
  components: {
    ListItem
  },
  data() {
    return {
      isEnd: false,
      isRepeat: false,
      current: "",
      status: "",
      tag: "",
      sort: "created",
      page: 0,
      limit: 20,
      catalog: "",
      isTop: "0",
      lists: []
    };
  },
  mixins: [getList]
};
</script>

<style scoped>
a:hover {
  cursor: pointer;
}
</style>
