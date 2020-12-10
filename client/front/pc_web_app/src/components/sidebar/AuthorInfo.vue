<template>
  <div class="author-info layui-card">
    <header class="layui-card-header">帖子作者</header>
    <div class="author-body layui-card-body">
      <img src="/header-k.jpg" alt="" />
      <span><i class="iconfont icon-Vip"></i> 金英焕</span>
    </div>
    <div class="author-footer ">
      <table class="layui-table" lay-skin="nob">
        <colgroup>
          <col width="150" />
          <col width="150" />
          <col width="200" />
        </colgroup>
        <thead>
          <tr>
            <th>笔记</th>
            <th>粉丝</th>
            <th>获赞与收藏</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>256</td>
            <td>8.1万</td>
            <td>22.5万</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthorInfo"
};
</script>

<style lang="scss" scoped>
.author-info {
}
.author-body {
  display: flex;
  align-items: center;
  img {
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 12px;
  }
  span {
    font-size: 18px;
    i {
      color: orange;
    }
  }
}
.author-footer {
  .layui-table {
    tr {
      background-color: #ffffff !important;
      color: #9e9e9e;
    }
  }
}
</style>
