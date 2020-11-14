<template>
  <div id="add">
    <div class="layui-container">
      <div class="layui-tab layui-tab-brief panda-bg-white panda-p-1">
        <ul class="layui-tab-title">
          <li class="layui-this">发表新帖</li>
        </ul>
        <div class="layui-tab-content">
          <div class="layui-tab-item layui-show">
            <validation-observer v-slot="{ handleSubmit }">
              <form
                @submit.prevent="handleSubmit(submit)"
                class="layui-form layui-form-pane"
              >
                <div class="layui-row ">
                  <div class="layui-col-md3">
                    <validation-provider
                      name="catalog"
                      rules="is_not:请选择"
                      v-slot="{ errors }"
                    >
                      <label class="layui-form-label">所在专栏</label>
                      <div class="layui-input-block" @click="switchCatalog">
                        <div
                          class="layui-unselect layui-form-select"
                          :class="{ 'layui-form-selected': isSelect_cata }"
                        >
                          <div class="layui-select-title">
                            <input
                              type="text"
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
                      <div class="danger panda-p-1">
                        {{ errors[0] }}
                      </div>
                    </validation-provider>
                  </div>

                  <div class="layui-col-md9">
                    <validation-provider
                      name="title"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label class="layui-form-label">标题</label>
                      <div class="layui-input-block">
                        <input
                          type="text"
                          name="title"
                          placeholder="请输入标题"
                          v-model="title"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class="danger panda-p-1">
                        {{ errors[0] }}
                      </div>
                    </validation-provider>
                  </div>
                </div>

                <editor @addContent="addContentVal" :initContent="content" />

                <div class="layui-form-item">
                  <label class="layui-form-label">悬赏积分</label>
                  <div class="layui-input-inline">
                    <div
                      class="layui-unselect layui-form-select"
                      @click="switchFav"
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
                <div class="layui-form-item">
                  <button type="submit" class="layui-btn">立即发布</button>
                </div>
              </form>
            </validation-observer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Captcha from "@/components/Captcha/index";
import Editor from "@/components/modules/editor/index";
import { validate } from "@/mixins/index";
import { publishPost } from "@/api/content";
export default {
  name: "Add",
  components: { Captcha, Editor },
  mixins: [validate],
  data() {
    return {
      isSelect_cata: false,
      isSelect_fav: false,
      cataIndex: 0,
      favIndex: 0,
      title: "",
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
      reRequest: false,
      content: ""
    };
  },
  mounted() {
    const saveData = localStorage.getItem("addData");
    if (saveData && saveData !== "") {
      this.$confirm(
        "是否加载未编辑完的内容？",
        () => {
          const obj = JSON.parse(saveData);
          this.content = obj.content;
          this.title = obj.title;
          this.cataIndex = obj.cataIndex;
          this.favIndex = obj.favIndex;
        },
        () => {
          localStorage.setItem("addData", "");
        }
      );
    }
  },
  methods: {
    switchCatalog() {
      this.isSelect_cata = !this.isSelect_cata;
    },
    switchFav() {
      this.isSelect_fav = !this.isSelect_fav;
    },
    updateVal(val) {
      this.code = val;
    },
    chooseCatalog(item, index) {
      this.cataIndex = index;
    },
    chooseFav(item, index) {
      this.favIndex = index;
    },
    addContentVal(val) {
      this.content = val;
      const addData = {
        title: this.title,
        cataIndex: this.cataIndex,
        content: this.content,
        favIndex: this.favIndex
      };
      if (this.title.trim() !== "" && this.content.trim() !== "") {
        localStorage.setItem("addData", JSON.stringify(addData));
      }
    },
    submit() {
      if (this.content.trim() === "") {
        this.$alert("请输入内容");
        return;
      }
      publishPost({
        title: this.title,
        catalog: this.catalogs[this.cataIndex].value,
        content: this.content,
        offerFav: this.favList[this.favIndex],
        code: this.code,
        sid: this.$store.state.sid
      }).then(res => {
        const result = res;
        if (result.code === 200) {
          this.$alert("发布新帖成功");
        }
      });
    }
  }
};
</script>

<style lang="sass" scoped></style>
