<template>
  <div id="panda_footer" class="panda-footer">
    <p>
      <a href="http://talks.sbfbi.xyz/" target="_blank">熊猫技术社区</a> 2020
      &copy;
      <a href="http://www.sbfbi.xyz/" target="_blank">Panda 出品</a>
    </p>
    <p>
      <a
        href="https://mp.weixin.qq.com/s/wDY7UuQld3U6zub5MUCtbQ"
        target="_blank"
        >加入团队</a
      >
      <a
        href="https://mp.weixin.qq.com/s/H9JI0dR1jPUN12qsRZ2r5Q"
        target="_blank"
        >React兴趣小组</a
      >
      <a
        href="javascript:void(0)"
        @mouseover="show()"
        @mouseout="hide()"
        style="position:relative;"
      >
        微信公众号
        <img
          class="qr"
          v-if="isShow"
          src="../../assets/images/qrcode-small.jpg"
          alt
        />
      </a>
    </p>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    show() {
      this.isShow = true;
    },
    hide() {
      setTimeout(() => {
        this.isShow = false;
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
.panda-footer {
  text-align: center;
  border-top: 1px solid #e8e7e8;
  padding: 15px;
  width: 100%;
}
.qr {
  width: 120px;
  height: 120px;
  position: absolute;
  left: 0;
  top: -130px;
}
</style>
