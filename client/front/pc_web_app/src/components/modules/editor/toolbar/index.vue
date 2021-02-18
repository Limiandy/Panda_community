<template>
  <ul class="toolbar">
    <li
      class="toolbar-item"
      v-for="(item, index) in toolbarItems"
      :key="'toolbar' + index"
      @mouseenter="showSubItem(index)"
      @mouseleave="hiddenSubItem()"
      :class="[
        { 'fl-rt': index > 7 },
        {
          down: index === 0 || index === 2 || index === 3 || index === 5
        }
      ]"
    >
      <a
        href="javascript:void(0)"
        @mouseenter="select(index)"
        @mouseleave="cancel()"
        ><i class="iconfont" :class="'icon-' + item.icon"></i>
        <span v-if="item.text === '发布文章'">{{ item.text }}</span>
      </a>
      <toolbar-pop
        :text="item.text"
        :show="showPop === index"
        :pos="pos(index)"
      />
      <toolbar-sub :items="item.subs" :show="showSub === index" />
    </li>
  </ul>
</template>

<script>
import Pop from "./pop.vue";
import Sub from "./sub.vue";
export default {
  name: "Toolbar",
  components: { "toolbar-pop": Pop, "toolbar-sub": Sub },
  data() {
    return {
      toolbarItems: [
        {
          icon: "bold",
          text: "粗体",
          subs: [
            {
              icon: "italic",
              text: "斜体"
            },
            {
              icon: "strikethrough",
              text: "删除线"
            },
            {
              icon: "quote",
              text: "引用"
            }
          ]
        },
        {
          icon: "image",
          text: "插入图片"
        },
        {
          icon: "h1",
          text: "标题1",
          subs: [
            {
              icon: "h2",
              text: "标题2"
            },
            {
              icon: "h3",
              text: "标题3"
            },
            {
              icon: "h4",
              text: "标题4"
            }
          ]
        },
        {
          icon: "hr",
          text: "分割线",
          subs: [
            {
              icon: "link",
              text: "插入链接"
            },
            {
              icon: "video",
              text: "插入视频"
            }
          ]
        },
        {
          icon: "formula",
          text: "数学公式"
        },
        {
          icon: "undo",
          text: "撤销",
          subs: [
            {
              icon: "redo",
              text: "重做"
            }
          ]
        },
        {
          icon: "history",
          text: "历史记录"
        },
        {
          icon: "audio",
          text: "插入音频"
        },
        {
          icon: "publish",
          text: "发布文章"
        },
        {
          icon: "full",
          text: "全屏"
        },
        {
          icon: "save",
          text: "保存"
        }
      ],
      showPop: -1,
      showSub: -1
    };
  },
  methods: {
    select(val) {
      this.showPop = val;
    },
    cancel() {
      this.showPop = -1;
    },
    showSubItem(val) {
      this.showSub = val;
    },
    hiddenSubItem() {
      this.showSub = -1;
    },
    pos(val) {
      switch (val) {
        case 0:
        case 2:
        case 3:
        case 5:
          return "right";
        case 8:
        case 9:
        case 10:
          return "center";
        default:
          return "top";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./iconfont/iconfont.css";

.toolbar {
  width: 100%;
  height: 40px;
  background-color: #d9d9d9;
  padding-right: 10px;
}
.toolbar-item {
  height: 100%;
  min-width: 45px;
  display: inline-block;
  position: relative;
  &:hover {
    &::after {
      display: none;
    }
  }
  a {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    color: #333;
    width: 100%;
    height: 100%;
    &:hover {
      cursor: pointer;
      color: #fff;
      background-color: #595959;
    }
    i {
      font-size: 18px;
    }
  }
}
.fl-rt {
  float: right;
}
.down {
  &::after {
    content: " ";
    display: block;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #999999;
    position: absolute;
    top: 5px;
    right: 3px;
  }
}
</style>
