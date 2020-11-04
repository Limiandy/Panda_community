<template>
  <div>
    <ul>
      <li>
        <i class="iconfont icon-qq"></i>
        <span>立即绑定，即可使用QQ帐号登录panda社区</span>
      </li>
      <li>
        <i class="iconfont icon-weibo"></i>
        <span>立即绑定，即可使用微博帐号登录panda社区</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AccountBinding"
};
</script>

<style lang="scss" scoped>
li {
  height: 60px;
  width: 100%;
  background-color: #e6e6e6;
  margin-bottom: 20px;
  padding: 15px;
  font-size: 16px;
  box-sizing: border-box;
  border-radius: 3px;
  i {
    font-size: 28px;
    margin-right: 15px;
  }
  .icon-qq {
    color: #3399cc;
  }
  .icon-weibo {
    color: #ff3300;
  }
  span {
    position: relative;
    top: -5px;
  }
}
</style>
