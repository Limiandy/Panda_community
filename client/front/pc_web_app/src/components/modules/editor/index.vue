<template>
  <div class="edit-content">
    <toolbar></toolbar>
    <div
      id="editor"
      class="area"
      spellcheck="false"
      @keydown.stop="agent_keyup($event)"
      @focus="_focus()"
      @blur="_blur()"
    ></div>
  </div>
</template>

<script>
import Toolbar from "./toolbar/index.vue";
import Qell from "./Qell";
export default {
  name: "Editor",
  components: { Toolbar },
  data() {
    return {};
  },
  mounted() {
    /**
      1. 事件代理，键盘事件，return、back、tab
      2. 功能模块，dom操作
      3. 数据处理，整理用户输入
     */
    this.init();
  },
  methods: {
    /**
     * 用户按键行为劫持
     * 1. 用户按下 return/enter 键，浏览器默认会添加 p || div || br ，统一处理，插入 p 标签
     */
    agent_keyup(e) {
      const keyCode = e.keyCode;
      console.log(keyCode);
      /**
       * 劫持 return/enter 按键
       */
      if (keyCode === 13) {
        e.preventDefault();
        // eslint-disable-next-line no-undef
        execCommand("insertParagraph");
        return false;
      }
      /**
       * 劫持退格键 如果是最后一个 p 元素，不能删除最后的这个 p 元素
       * 实现方法：
       * 如果按下 退格键后，文本域中没有任何元素了，则向文本域中重新添加一个 p 节点
       */
      if (keyCode === 8) {
        if (e.target.children.length === 1) {
          const el = e.target.childNodes[0];
          if (el.innerHTML === "<br>") {
            e.preventDefault();
            return false;
          }
        }
      }
      /**
       * 劫持 Tab 键
       */
      if (keyCode === 9) {
        e.preventDefault();
        return false;
      }
    },
    _focus() {
      console.log("focus");
    },
    _blur() {
      console.log("blur");
    },
    init() {
      const edit = document.querySelector("#editor");
      const qell = new Qell(edit);
      qell.init();
    }
  }
};
</script>

<style lang="scss">
.edit-content {
  width: 100%;
  height: 100%;
}
.area {
  color: #333;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.7;
  width: 100%;
  height: calc(100% - 40px);
  padding: 40px 40px 80px;
  &:focus {
    outline: none;
  }
  p {
    margin: 0 0 25px;
    word-break: break-word;
  }
}
</style>
