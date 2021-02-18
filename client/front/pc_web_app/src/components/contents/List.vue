<template>
  <div class="list-page">
    <div class="breadcrumb text-middle">
      <a
        href="javascript:void(0)"
        class="breadcrumb-item"
        :class="{ active: status === '' && tag === '' }"
        @click.prevent="search()"
        >综合</a
      >
      <a
        href="javascript:void(0)"
        class="breadcrumb-item"
        :class="{ active: status === '0' }"
        @click.prevent="search(0)"
        >未结</a
      >
      <a
        href="javascript:void(0)"
        class="breadcrumb-item"
        :class="{ active: status === '1' }"
        @click.prevent="search(1)"
        >已结</a
      ><a
        href="javascript:void(0)"
        class="breadcrumb-item"
        :class="{ active: status === '' && tag === '精华' }"
        @click.prevent="search(2)"
        >精华</a
      >
      <span class="breadcrumb-space"></span>
      <a
        href="javascript:void(0)"
        class="breadcrumb-item"
        :class="{ active: sort === 'created' }"
        @click.prevent="search(3)"
        >按最新</a
      ><a
        href="javascript:void(0)"
        class="breadcrumb-item"
        :class="{ active: sort === 'answer' }"
        @click.prevent="search(4)"
        >按热议</a
      >
    </div>
    <hr />
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

<style lang="scss" scoped>
.list-page {
  background-color: #fff;
  padding: 5px;
}
/* 面包屑 */
.breadcrumb {
  width: 100%;
  height: 30px;
  position: relative;
}

.breadcrumb-item {
  display: inline-block;
  color: #d2d2d2 !important;
  margin-right: 15px;
}

.breadcrumb .breadcrumb-item:hover {
  cursor: pointer;
  color: #009688 !important;
}

.breadcrumb-space {
  display: inline-block;
  width: 1px;
  height: 20px;
  background-color: #d2d2d2;
  position: relative;
  top: 5px;
  margin-right: 20px;
}

.active {
  color: #5fb878 !important;
}
</style>
