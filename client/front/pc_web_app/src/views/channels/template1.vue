<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <top />
        <list />
      </div>
      <div class="layui-col-md4">
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
import { Ads, HotList, Links } from "@/components/sidebar/index";
export default {
  name: "Template1",
  components: {
    List,
    Top,
    Ads,
    HotList,
    Links
  }
};
</script>
