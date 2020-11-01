<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <top />
        <list />
      </div>
      <div class="layui-col-md4">
        <tips />
        <sign />
        <hot-list />
        <ads />
        <links />
      </div>
    </div>
  </div>
</template>

<script>
import List from "@/components/contents/List";
import Top from "@/components/contents/Top";
import { Ads, HotList, Links, Sign, Tips } from "@/components/sidebar/index";
export default {
  name: "Index",
  components: {
    List,
    Top,
    Ads,
    HotList,
    Links,
    Sign,
    Tips
  }
};
</script>
