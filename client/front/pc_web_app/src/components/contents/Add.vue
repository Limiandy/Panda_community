<template>
  <!-- <div id="add">
    <div class="layui-container bg-white">
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

                <editor
                  height="550"
                  :value="content"
                  @reviveVal="addContentVal"
                ></editor>

                <div
                  class="layui-form-item"
                  v-if="cataIndex === 1"
                  style="margin-top: 20px;"
                >
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
                  ref="captcha"
                  @receiveCode="receiveCode"
                  :style="cataIndex === 1 ? '' : 'margin-top: 20px;'"
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
  </div> -->
  <div id="add">
    <div class="catalogs">
      <div class="p-20">
        <div class="go-home text-middle text-center">
          <router-link :to="{ name: 'Home' }" class="f-s-16 f-w-600"
            >回首页</router-link
          >
        </div>
      </div>

      <ul class="catalog-lists">
        <li
          :class="{ selected: index === cataIndex }"
          v-for="(item, index) in catalogs"
          :key="'cata' + index"
          @click="chooseCatalog(item, index)"
        >
          {{ item.text }}
        </li>
      </ul>

      <div class="ctrl">
        <span><i class="iconfont icon-entypomenu"></i> 设置</span>
        <span
          >反馈问题
          <i
            class="iconfont icon-yiwen f-s-18"
            style="position: relative; top: 2px"
          ></i
        ></span>
      </div>
    </div>
    <div class="postlists">
      <div class="postlists-body">
        <div class="new-post-btn">
          <i class="iconfont icon-add"></i> 新建文章
        </div>
        <ul class="posts">
          <li class="media active">
            <div class="media-avatar text-middle text-center">
              <i class="iconfont icon-page text-gray"></i>
            </div>
            <div class="media-body">
              <p class="f-s-18 f-w-500">
                titledddfddfsdfsafsadfasdfsdfsfsdfsfasfsafsddfsgdfgdsf
              </p>
              <p>content</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="editor-box">
      <div class="post-title f-s-18 f-w-500 text-middle">title</div>
      <div class="editor">
        <Editor></Editor>
      </div>
    </div>
  </div>
</template>

<script>
import Captcha from "@/components/Captcha/index";
import Editor from "@/components/modules/editor";
import { validate } from "@/mixins/index";
import { publishPost } from "@/api/content";
export default {
  name: "Add",
  // eslint-disable-next-line vue/no-unused-components
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
          text: "请选择:",
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

    this.$store.commit("setIsNot", true);
  },
  beforeDestroy() {
    this.$store.commit("setIsNot", false);
  },
  methods: {
    switchCatalog() {
      this.isSelect_cata = !this.isSelect_cata;
    },
    switchFav() {
      this.isSelect_fav = !this.isSelect_fav;
    },
    receiveCode(val) {
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
        offerFav: this.cataIndex === 1 ? this.favList[this.favIndex] : 0,
        code: this.code,
        sid: this.$store.state.sid
      }).then(res => {
        const result = res;
        if (result.code === 200) {
          localStorage.setItem("addData", "");
          this.$alert("发布新帖成功", () => {
            this.$router.push({
              name: "Detail",
              params: { tid: result.data._id }
            });
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#add {
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  background-color: #fff;
  & > * {
    height: 100%;
  }
}
.catalogs {
  position: relative;
  flex: 1.2;
  background-color: #404040;
  .go-home {
    width: 100%;
    height: 40px;
    border: 1px solid #9d5c4e;
    border-radius: 20px;
    a {
      color: #9d5c4e;
    }
  }
  .catalog-lists {
    width: 100%;
    color: #c1c1c1;

    li {
      width: 100%;
      font-size: 16px;
      padding: 8px 20px;
      &:hover {
        cursor: pointer;
        background-color: #666666;
      }
    }
    .selected {
      position: relative;
      background-color: #666666;
      &::before {
        content: "";
        display: block;
        width: 3px;
        height: 100%;
        background-color: #9d5c4e;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
  .ctrl {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    color: #c1c1c1;
    span {
      display: inline-block;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
.postlists {
  flex: 1.9;
  border-right: 1px solid #e2e2e2;
  .postlists-body {
    width: 100%;
    height: 100%;
    .new-post-btn {
      width: 100%;
      padding: 20px;
      border-bottom: 1px solid #e2e2e2;
    }
    .posts {
      .active {
        background-color: #e2e2e2;
        &::before {
          content: "";
          display: block;
          width: 3px;
          height: 100%;
          background-color: #9d5c4e;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
      .media {
        position: relative;
        height: 70px;
        border-bottom: 1px solid #e2e2e2;
        &:hover {
          cursor: pointer;
          background-color: #e2e2e2;
        }
        &::after {
          display: none;
        }
        .media-body {
          p {
            width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
.editor-box {
  flex: 4.3;
  .post-title {
    height: 62px;
    padding: 0 20px;
  }
  .editor {
    height: calc(100% - 62px);
  }
}
</style>
