<template>
  <div class="panda-panel panda-signin">
    <div class="panda-panel-title">
      签到
      <i class="panda-mid"></i>
      <a href="javascript:;" class="panda-link" id="LAY_signinHelp">说明</a>
      <i class="panda-mid"></i>
      <a href="javascript:;" class="panda-link" id="LAY_signinTop"
        >活跃榜<span class="layui-badge-dot"></span
      ></a>
      <span class="panda-signin-days">已连续签到<cite>16</cite>天</span>
    </div>
    <div class="panda-panel-main panda-signin-main">
      <button class="layui-btn layui-btn-danger" id="LAY_signin">
        今日签到
      </button>
      <span>可获得<cite>5</cite>飞吻</span>

      <!-- 已签到状态 -->
      <!--
      <button class="layui-btn layui-btn-disabled">今日已签到</button>
      <span>获得了<cite>20</cite>飞吻</span>
      -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Sign"
};
</script>

<style scoped></style>
