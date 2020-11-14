<template>
  <transition name="fade">
    <div class="panda-face-wrap" v-show="isShow">
      <div class="panda-face-content">
        <ul class="layui-row">
          <li
            class="layui-col-md1"
            v-for="(value, key) in lists"
            :key="key"
            @click="handleFaceClick(key)"
          >
            <img :src="value" alt="" />
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import faces from "@/assets/js/face";
export default {
  name: "Face",
  props: ["isShow"],
  data() {
    return {
      lists: faces
    };
  },
  methods: {
    handleFaceClick(item) {
      this.$emit("addEvent", "face", item);
      this.$emit("closeEvent");
    }
  }
};
</script>

<style lang="scss" scoped>
.panda-face-wrap {
  width: 350px;
  box-shadow: 1px 1px 2px rgba($color: #000000, $alpha: 0.08);
  border-radius: 2px;
  padding: 10px;
  position: absolute;
  left: 3px;
  top: 35px;

  li {
    border: 1px solid #ccc;
    padding: 2px;
    cursor: pointer;
    &:hover {
      border: none;
      transform: scale(1.5);
    }
  }
}
</style>
