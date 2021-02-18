<template>
  <ul class="sub-items" v-show="show">
    <li
      class="sub-item"
      v-for="(item, index) in items"
      :key="'sub' + index"
      @mouseenter="showPop(index)"
      @mouseleave="cancel()"
    >
      <a href="javascript:void(0)">
        <i class="iconfont" :class="'icon-' + item.icon"></i>
      </a>
      <sub-pop :text="item.text" :show="isShow === index" :pos="'right'" />
    </li>
  </ul>
</template>

<script>
import Pop from "./pop.vue";
export default {
  name: "toolbar-sub",
  components: { "sub-pop": Pop },
  props: ["items", "show"],
  data() {
    return {
      isShow: -1
    };
  },
  methods: {
    showPop(val) {
      this.isShow = val;
    },
    cancel() {
      this.isShow = -1;
    }
  }
};
</script>

<style lang="scss" scoped>
.sub-items {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
  width: 100%;
  position: absolute;
}
.sub-item {
  height: 45px;
  width: 100%;
  position: relative;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    width: 100%;
    height: 100%;
    &:hover {
      cursor: pointer;
      color: #fff;
      background-color: #595959;
    }
  }
}
</style>
