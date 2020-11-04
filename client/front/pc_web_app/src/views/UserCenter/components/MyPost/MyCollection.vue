<template>
  <div class="publish-wrap">
    <table class="layui-table">
      <colgroup>
        <col width="0" />
        <col width="270" />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th style="text-align: left">帖子标题</th>
          <th>收藏时间</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: left">幕课网全栈实践课程</td>
          <td>2020-10-28</td>
        </tr>
      </tbody>
    </table>
    <paging class="paging" />
  </div>
</template>

<script>
import Paging from "@/components/Paging/index";
export default {
  name: "MyCollection",
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
