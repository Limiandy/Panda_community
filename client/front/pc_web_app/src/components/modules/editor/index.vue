<template>
  <div ref="textEdit" class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <ul class="layui-unselect panda-edit" ref="icons">
          <li
            v-for="(item, index) in btnList"
            :key="'btn' + index"
            @click="
              choose(index);
              index === 5 && addEvent('hr', 'hr');
            "
          >
            <i class="iconfont" :class="item"></i>
          </li>
        </ul>
        <label>
          <textarea
            id="edit"
            class="layui-textarea panda-editor"
            name="content"
            v-model="content"
            @focus="focusEvent()"
            @blur="blurEvent()"
          ></textarea>
        </label>
      </div>
    </div>
    <div ref="modal">
      <face
        :isShow="current === 0"
        @closeEvent="closeModel()"
        @addEvent="addEvent"
      />
      <uploadImg
        :isShow="current === 1"
        @closeEvent="closeModel()"
        @addEvent="addEvent"
      />
      <link-add
        :isShow="current === 2"
        @closeEvent="closeModel()"
        @addEvent="addEvent"
      />
      <quote
        :is-show="current === 3"
        @closeEvent="closeModel()"
        @addEvent="addEvent"
      />
      <code-box
        :is-show="current === 4"
        :width="codeWidth"
        :height="codeHeight"
        @closeEvent="closeModel()"
        @addEvent="addEvent"
      />
      <preview
        :is-show="current === 6"
        :content="content"
        @closeEvent="closeModel()"
      />
    </div>
  </div>
</template>

<script>
import Face from "./components/Face";
import uploadImg from "./components/uploadImg";
import LinkAdd from "./components/LinkAdd";
import Quote from "./components/Quote";
import CodeBox from "./components/CodeBox";
import Preview from "./components/Preview";
export default {
  name: "Editor",
  components: {
    Face,
    uploadImg,
    LinkAdd,
    Quote,
    CodeBox,
    Preview
  },
  data() {
    return {
      btnList: [
        "icon-biaoqing",
        "icon-tupian",
        "icon-lianjie",
        "icon-quote",
        "icon-dashujukeshihuaico-",
        "icon-hr",
        "icon-chakan"
      ],
      current: "",
      codeWidth: 0,
      codeHeight: 0,
      content: "",
      pos: ""
    };
  },
  updated() {
    this.$emit("addContent", this.content);
  },
  methods: {
    addEvent(ref, val) {
      let insertContent = "";
      switch (ref) {
        case "face":
          insertContent = ` ${ref}${val}`;
          break;
        case "img":
          insertContent = `${ref}[${val}]`;
          break;
        case "link":
          insertContent = ` a(${val})[${val}]`;
          break;
        case "code":
          insertContent = `\n[pre]\n${val}\n[/pre]`;
          break;
        case "hr":
          insertContent = `\n[${val}]\n`;
          break;
        case "quote":
          insertContent = `\n[${ref}]\n${val}\n[/${ref}]`;
      }
      this.insert(insertContent);
      this.pos += insertContent.length;
    },
    insert(val) {
      if (typeof this.content === "undefined") {
        return;
      }
      let tmp = this.content.split("");
      tmp.splice(this.pos, 0, val);
      this.content = tmp.join("");
    },
    focusEvent() {
      this.getPos();
    },
    blurEvent() {
      this.getPos();
    },
    getPos: function() {
      let cursorPos = 0;
      const elem = document.getElementById("edit");
      const selection = document.selection;
      if (selection) {
        let selectRange = selection.createRange();
        selectRange.moveStart("character", -elem.value.length);
        cursorPos = selectRange.text.length;
      } else if (elem.selectionStart || elem.selectionStart === "0") {
        cursorPos = elem.selectionStart;
      }
      this.pos = cursorPos;
    },
    choose(v) {
      this.current = v;
    },
    closeModel() {
      this.current = "";
    },
    handleBodyClick(e) {
      e.stopPropagation();
      // 触发隐藏本组件的关闭事件,改变isShow的状态
      // 判断是否点击了非控制icon以外的区域
      if (
        !(
          this.$refs.icons.contains(e.target) ||
          this.$refs.modal.contains(e.target)
        )
      ) {
        this.current = "";
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      document
        .querySelector("body")
        .addEventListener("click", this.handleBodyClick);
    });
    this.codeWidth = this.$refs.textEdit.offsetWidth - 44;
    this.codeHeight = this.$refs.textEdit.offsetHeight - 80;
    window.addEventListener("resize", () => {
      this.codeWidth = this.$refs.textEdit.offsetWidth - 44;
      this.codeHeight = this.$refs.textEdit.offsetHeight - 80;
    });
  },
  beforeDestroy() {
    document
      .querySelector("body")
      .removeEventListener("click", this.handleBodyClick);
    window.removeEventListener("resize", () => {
      this.codeWidth = this.$refs.textEdit.offsetWidth - 60;
      this.codeHeight = this.$refs.textEdit.offsetHeight - 80;
    });
  }
};
</script>

<style lang="scss" scoped>
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounceOut {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(0.7);
  }
}

.fade-leave-active {
  animation: bounceOut 0.3s;
}

.fade-enter-active,
.fade-enter-to {
  animation: bounceIn 0.3s;
}

.edit-wrap {
  position: relative;
}
.panda-edit {
  display: flex;
  flex-wrap: nowrap;
  justify-content: left;
  align-items: center;
  height: 35px;
  width: 100%;
  background-color: #fbfbfb;
  border: 1px solid #e6e6e6;
  border-radius: 2px;
  border-bottom: none;
  padding-left: 10px;
  box-sizing: border-box;
  li {
    margin-right: 15px;
    cursor: pointer;
    i {
      font-size: 18px;
      color: #36a690;
    }
    .quote {
      font-size: 22px;
      vertical-align: middle;
      position: relative;
      top: 4px;
    }
  }
}
.panda-editor {
  height: 300px;
  resize: none;
}
</style>
