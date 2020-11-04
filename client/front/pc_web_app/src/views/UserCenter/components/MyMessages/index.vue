<template>
  <div class="message-wrap">
    <header>
      <button type="button" class="layui-btn">清空全部消息</button>
    </header>
    <ul class="msg-list">
      <li v-for="(item, index) in msgLists" :key="'msg' + index">
        <div class="msg-panel">
          <span>{{ item.name }}</span>
          回复了您
          <span>{{ item.post }}</span>
        </div>
        <span>{{ item.created }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "myMessages",
  data() {
    return {
      msgLists: [
        {
          name: "andy",
          post: "test post",
          created: "1小时前"
        },
        {
          name: "andy",
          post: "test post",
          created: "1小时前"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.message-wrap {
  padding: 10px;
  header {
    padding: 10px 0;
    border-bottom: 1px solid #e6e6e6;
  }
}
.msg-list {
  width: 100%;
  margin-top: 10px;
  li {
    width: 100%;
    margin-bottom: 25px;
    .msg-panel {
      width: 100%;
      height: 60px;
      line-height: 60px;
      padding-left: 15px;
      box-sizing: border-box;
      border-left: 2px solid #009688;
      box-shadow: 0 0 2px rgba($color: #000000, $alpha: 0.3);
      margin-bottom: 10px;
      span {
        color: #009688;
      }
    }
  }
}
</style>
