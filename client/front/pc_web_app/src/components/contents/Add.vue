import { validate } from '@/mixins/index.js'; import { getCaptcha } from
'@/mixins/index';
<template>
  <div id="add">
    <div class="layui-container">
      <div class="layui-tab layui-tab-brief panda-bg-white panda-p-1">
        <ul class="layui-tab-title">
          <li class="layui-this">发表新帖</li>
        </ul>
        <div class="layui-tab-content">
          <div class="layui-tab-item layui-show">
            <form class="layui-form layui-form-pane">
              <div class="layui-row panda-mb-2">
                <div class="layui-col-md3">
                  <label class="layui-form-label">所在专栏</label>
                  <div
                    class="layui-input-block"
                    @click="
                      () => {
                        this.isSelect_cata = !isSelect_cata;
                      }
                    "
                  >
                    <div
                      class="layui-unselect layui-form-select"
                      :class="{ 'layui-form-selected': isSelect_cata }"
                    >
                      <div class="layui-select-title">
                        <input
                          type="text"
                          placeholder="请选择"
                          v-model="catalogs[cataIndex].text"
                          readonly
                          class="layui-input layui-unselect"
                        />
                        <i class="layui-edge"></i>
                      </div>
                      <dl class="layui-anim layui-anim-upbit">
                        <dd
                          v-for="(item, index) in catalogs"
                          :key="'catalogs' + index"
                          @click="chooseCatalog(item, index)"
                          :class="{ 'layui-this': cataIndex === index }"
                        >
                          {{ item.text }}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div class="layui-col-md9">
                  <label for="" class="layui-form-label">标题</label>
                  <div class="layui-input-block">
                    <input
                      type="text"
                      name="title"
                      required
                      lay-verify="required"
                      placeholder="请输入标题"
                      autocomplete="off"
                      class="layui-input"
                    />
                  </div>
                </div>
              </div>

              <div class="layui-form-item">
                <label class="layui-form-label">悬赏积分</label>
                <div class="layui-input-inline">
                  <div
                    class="layui-unselect layui-form-select"
                    @click="
                      () => {
                        this.isSelect_fav = !this.isSelect_fav;
                      }
                    "
                    :class="{ 'layui-form-selected': isSelect_fav }"
                  >
                    <div class="layui-select-title">
                      <input
                        type="text"
                        placeholder="请选择"
                        readonly
                        v-model="favList[favIndex]"
                        class="layui-input layui-unselect"
                      />
                      <i class="layui-edge"></i>
                    </div>
                    <dl class="layui-anim layui-anim-upbit">
                      <dd
                        v-for="(item, index) in favList"
                        :key="'fav' + index"
                        @click="chooseFav(item, index)"
                        :class="{ 'layui-this': index === favIndex }"
                      >
                        {{ item }}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <captcha
                :input="code"
                :updateVal="updateVal"
                :reRequest="reRequest"
              ></captcha>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Captcha from "@/components/Captcha/index";
export default {
  name: "Add",
  components: { Captcha },
  data() {
    return {
      isSelect_cata: false,
      isSelect_fav: false,
      cataIndex: 0,
      favIndex: 0,
      catalogs: [
        {
          text: "请选择",
          value: ""
        },
        {
          text: "提问",
          value: "ask"
        },
        {
          text: "分享",
          value: "share"
        },
        {
          text: "讨论",
          value: "discuss"
        },
        {
          text: "建义",
          value: "advise"
        }
      ],
      favList: [20, 30, 50, 60, 80],
      code: "",
      reRequest: false
    };
  },
  methods: {
    updateVal(val) {
      this.code = val;
    },
    chooseCatalog(item, index) {
      this.cataIndex = index;
    },
    chooseFav(item, index) {
      this.favIndex = index;
    }
  }
};
</script>

<style lang="sass" scoped></style>
