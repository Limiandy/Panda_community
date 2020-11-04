<template>
  <div class="publish-wrap">
    <table class="layui-table">
      <colgroup>
        <col width="0" />
        <col width="0" />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th>帖子标题</th>
          <th>状态</th>
          <th>结帖</th>
          <th>发表时间</th>
          <th>数据</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>幕课网全栈实践课程</td>
          <td>打开</td>
          <td>已结</td>
          <td>2019-01-01</td>
          <td>101阅/5答</td>
          <td>
            <div class="layui-btn layui-btn-xs">编辑</div>
            <div class="layui-btn layui-btn-xs layui-btn-danger">删除</div>
          </td>
        </tr>
      </tbody>
    </table>
    <paging class="paging" />
  </div>
</template>

<script>
import Paging from "@/components/Paging/index";
export default {
  name: "MyPublish",
  components: {
    Paging
  }
};
</script>

<style lang="scss" scoped>
.publish-wrap {
  position: relative;
  height: 100%;
}
.layui-table {
  th,
  td {
    text-align: center;
  }
}
.paging {
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
}
</style>
