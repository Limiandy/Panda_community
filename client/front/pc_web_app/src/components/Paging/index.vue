<template>
  <div
    id="paging"
    :class="[
      { center: pos === 'center' },
      { left: pos === 'left' },
      { right: pos === 'right' }
    ]"
  >
    <div class="layui-box layui-laypage layui-laypage-default">
      <a
        href="javascript:;"
        class="layui-laypage-prev"
        :class="{ 'layui-disabled': curr === 1 }"
        @click="prev()"
        ><i class="layui-icon layui-icon-left"></i
      ></a>

      <a
        href="javascript:;"
        class="layui-laypage-last"
        title="首页"
        @click="firstPage()"
        v-if="curr >= 4"
        >1</a
      >
      <span class="layui-laypage-spr" v-if="pages.length > 5 && curr - 2 > 1"
        >…</span
      >

      <template v-for="(item, index) in pages">
        <a
          @click="choose(index)"
          href="javascript:void(0)"
          :key="'page' + index"
          :class="{ 'layui-laypage-curr': index + 1 === curr }"
          v-if="item >= curr - 2 && item <= curr + 2"
        >
          <em class="layui-laypage-em"></em>
          <em>{{ item }}</em></a
        >
      </template>

      <span
        class="layui-laypage-spr"
        v-if="pages.length > 5 && curr + 2 < pages.length"
        >…</span
      >
      // TODO: 这里逻辑不对需要调整
      <a
        href="javascript:;"
        class="layui-laypage-last"
        title="尾页"
        @click="lastPage()"
        v-if="pages.length > 5 && curr < pages.length - 2"
        >{{ pages.length }}</a
      >

      <a
        href="javascript:;"
        class="layui-laypage-next"
        :class="{ 'layui-disabled': curr === pages.length }"
        @click="next()"
        ><i class="layui-icon layui-icon-right"></i
      ></a>

      <span class="layui-laypage-limits layui-hide-xs">
        <select v-model="limits" @change="changeLimit()">
          <option value="10" selected="">10 条/页</option>
          <option value="20">20 条/页</option>
          <option value="30">30 条/页</option>
          <option value="40">40 条/页</option>
          <option value="50">50 条/页</option>
        </select>
      </span>

      <!-- <a
        href="javascript:;"
        class="layui-laypage-refresh layui-hide-xs"
        @click.prevent="refresh"
      >
        <i class="layui-icon layui-icon-refresh"></i>
      </a> -->

      <!-- <span class="layui-laypage-skip layui-hide-xs ">
        到第<input
          ref="skipInput"
          type="text"
          min="1"
          v-model="skip"
          class="layui-input"
        />页<button
          type="button"
          class="layui-laypage-btn"
          @click.prevent="skipEvent"
        >
          确定
        </button>
      </span> -->
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "Paging",
  props: {
    totail: {
      // 用户传递过来的数据条数总计
      type: Number,
      default: 100
    },
    pos: {
      type: String,
      default: "center"
    }
  },
  data() {
    return {
      pages: [],
      curr: 1,
      limits: "10",
      skip: 1
    };
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage() {
      let len = Math.ceil(this.totail / parseInt(this.limits));
      this.pages = _.range(1, len + 1);
    },
    changeLimit() {
      this.initPage();
    },
    prev() {
      if (this.curr === 1) {
        return;
      }
      this.curr -= 1;
    },
    next() {
      if (this.curr >= this.pages.length) {
        return;
      }
      this.curr += 1;
    },
    firstPage() {
      this.curr = 1;
    },
    lastPage() {
      this.curr = this.pages.length;
    },
    choose(v) {
      this.curr = v + 1;
    }
    // refresh() {
    //   this.initPage();
    //   this.curr = 1;
    //   this.$emit("refresh", this.limits);
    // },
    // skipEvent() {
    //   if (this.skip > this.pages.length) {
    //     this.$pop("shake", "没有该页码，请重新输入");
    //     this.skip = 1;
    //     this.$refs.skipInput.focus();
    //     return;
    //   }
    //   this.curr = parseInt(this.skip);
    // }
  },
  watch: {
    limits(n, o) {
      // 当前已读 条数 = this.curr * o = 30 如果已经是最后一页了，则应为this.totail
      const already =
        this.curr === Math.ceil(this.totail / o) ? this.totail : this.curr * o;
      // 如果 每页显示条数变为 20 则当前页，应为 30 / 20 = 2
      let tmp = Math.ceil(already / n);
      this.curr = tmp;
    }
  }
};
</script>

<style lang="scss" scoped>
@media (min-width: 767px) and (max-width: 991px) {
  .layui-laypage-skip,
  .layui-laypage-refresh {
    display: none;
  }
}
#paging {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.center {
  justify-content: center;
}
.left {
  justify-content: start;
}
.right {
  justify-content: end;
}
.layui-box {
  display: flex;
  flex-flow: row nowrap;
}
</style>
