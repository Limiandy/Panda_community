<template>
  <form>
    <div class="paging">
      <div class="btn-group">
        <button type="button" class="layui-btn layui-btn-sm">
          上一页
        </button>
        <span class="text-box">1</span>
        <button type="button" class="layui-btn layui-btn-sm">
          下一页
        </button>
      </div>
      <div class="select-group">
        <span>到第</span>
        <input type="text" v-model="pageVal" />
        <span>页</span>
        <span style="margin: 0 10px">共<i style="margin: 0 5px">6</i>条</span>
        <select name="pageSelect" id="pageSelect">
          <option selected value="10">10条/页</option>
          <option value="20">20条/页</option>
        </select>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "Paging",
  data() {
    return {
      pageVal: 1
    };
  }
};
</script>

<style lang="scss" scoped>
.paging {
  height: 35px;
  line-height: 35px;
  display: flex;
  flex-wrap: nowrap;
  box-shadow: 0 0 2px rgba($color: #000000, $alpha: 0.1);
  .text-box {
    margin: 0 10px;
    padding: 0 10px;
  }
}
.btn-group {
  margin-right: 20px;
}
.select-group {
  input {
    width: 25px;
    text-align: center;
    margin: 0 10px;
  }
}
</style>
