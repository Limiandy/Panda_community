<template>
  <div class="detail">
    <panel />
    <div class="layui-container">
      <div class="layui-row layui-col-space10">
        <div class="layui-col-md8 ">
          <div class="panda-post-wrap panda-bg-white panda-p-1">
            <section class="post-details m-b-10">
              <h1 class="post-title f-s-24 f-w-500">{{ postDetail.title }}</h1>
              <div class="media">
                <a href="javascript:void(0)" class="media-avatar">
                  <img
                    :src="
                      typeof postDetail.uid === 'undefined' ||
                      postDetail.uid.pic === ''
                        ? '/header-k.jpg'
                        : postDetail.uid.pic
                    "
                    alt="用户头像"
                  />
                </a>
                <div class="media-body">
                  <div class="media-heading">
                    <span class="f-s-18 f-w-500">
                      {{
                        typeof postDetail.uid === "undefined"
                          ? "临时用户"
                          : postDetail.uid.nickName
                      }}
                    </span>
                    <div class="layui-btn-group">
                      <button
                        type="button"
                        class="layui-btn layui-btn-radius layui-btn-sm layui-btn-danger"
                        v-if="
                          typeof postDetail.uid !== 'undefined' &&
                            postDetail.uid._id ===
                              this.$store.state.userInfo._id
                        "
                      >
                        编辑
                      </button>
                      <button
                        type="button"
                        class="layui-btn layui-btn-radius layui-btn-sm layui-btn-warm"
                      >
                        收藏
                      </button>
                    </div>
                  </div>
                  <p>
                    <span class="user-favs m-r-10"
                      ><i class="iconfont icon-jifen f-s-14 m-r-5"></i>
                      {{ postDetail.uid ? postDetail.uid.favs : 0 }}
                    </span>
                    <span class="text-gray m-r-10">{{
                      postDetail.created | currentTime
                    }}</span>
                    <span class="text-gray m-r-10">字数 2,621</span>
                    <span class="text-gray">阅读 {{ postDetail.answer }}</span>
                  </p>
                </div>
              </div>
              <div class="post-content" v-richtext="postDetail.content"></div>
            </section>
            <section class="comment-lists">
              <label for="comment_box"></label>
              <textarea
                id="comment_box"
                class="comment-box m-t-10"
                placeholder="写下你的评论"
                v-model="userComment"
                @focus="
                  () => {
                    this.isFocus = true;
                  }
                "
              ></textarea>
              <div class="comment-box-ctr" v-show="isFocus">
                <div class="expression text-gray">
                  <i class="iconfont icon-biaoqing f-s-24 f-w-700"></i>
                  <span>⌘ + return 快速发表</span>
                </div>
                <div class="btns">
                  <button
                    type="button"
                    class="layui-btn layui-btn-radius layui-btn-warm"
                    @click="_publishComment()"
                  >
                    发布
                  </button>
                  <button
                    type="button"
                    class="layui-btn layui-btn-radius layui-btn-primary"
                  >
                    取消
                  </button>
                </div>
              </div>
              <div class="comment-heading f-s-18 f-w-600">精彩评论</div>
              <ul>
                <li
                  class="comment-items"
                  v-for="(item, index) in comments"
                  :key="'comment' + index"
                >
                  <div class="media">
                    <div class="media-avatar">
                      <img
                        :src="
                          item.cuid && item.cuid.pic !== ''
                            ? item.cuid.pic
                            : '/header-k.jpg'
                        "
                        alt="评论用户头像"
                      />
                    </div>
                    <div class="media-body">
                      <p class="f-s-16 f-w-500">
                        {{ item.cuid ? item.cuid.nickName : "临时用户" }}
                      </p>
                      <p class="text-gray">
                        {{ comments.length - index }}楼
                        {{ item.created | currentTime }}
                      </p>
                      <div
                        class="comment-content m-t-10"
                        v-richtext="item.content"
                      ></div>
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>
        <div class="layui-col-md4">
          <author-info />
          <hot-list />
          <ads />
          <links />
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="pop-captcha" v-show="showCaptcha">
        <div class="captcha-container p-20">
          <p class="text-middle text-center f-s-16 f-w-500 m-b-35">
            请输入验证码
          </p>
          <captcha ref="captcha" @receiveCode="receiveCode">
            <div class="layui-btn-container p-r-30">
              <button
                class="layui-btn layui-btn-primary"
                type="button"
                @click="cancelPublish()"
              >
                取消
              </button>
              <button
                class="layui-btn layui-btn-warm"
                type="button"
                @click="successPublish()"
              >
                确定
              </button>
            </div>
          </captcha>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getDetail } from "@/api/content";
import { getComments, publishComment } from "@/api/comments";
import Panel from "@/components/Panel/index";
import { HotList, Ads, Links } from "@/components/sidebar/index";
import AuthorInfo from "@/components/sidebar/AuthorInfo";
import Captcha from "@/components/Captcha/index";

export default {
  name: "Detail",
  components: {
    AuthorInfo,
    HotList,
    Ads,
    Links,
    Panel,
    Captcha
  },
  props: ["tid"],
  data() {
    return {
      postDetail: {},
      comments: [],
      userComment: "",
      isFocus: false,
      showCaptcha: false,
      code: "",
      valid: false
    };
  },
  mounted() {
    this._getDetail();
    this._getComments();
  },
  methods: {
    _getDetail() {
      getDetail(this.tid)
        .then(res => {
          if (res.code === 200) {
            this.postDetail = res.data;
          }
        })
        .catch(e => {
          if (e) {
            this.$alert("没有该文章");
          }
        });
    },
    _getComments() {
      getComments(this.tid).then(res => {
        if (res.code === 200) {
          this.comments = res.data;
        }
      });
    },
    _publishComment() {
      if (!this.$store.state.isLogin) {
        this.$pop("shake", "请登录后操作");
        return;
      }
      this.showCaptcha = true;
    },
    cancelPublish() {
      this.$refs.captcha.reRequest();
      setTimeout(() => {
        this.showCaptcha = false;
      }, 300);
    },
    successPublish() {
      if (!this.valid) {
        return;
      }
      if (this.userComment.trim() === "") {
        this.cancelPublish();
        setTimeout(() => {
          this.$pop("shake", "请输入评论内容！");
        }, 500);
        return;
      }
      const options = {
        tid: this.tid,
        cuid: this.$store.state.userInfo._id,
        content: this.userComment,
        code: this.code,
        sid: this.$store.state.sid
      };
      publishComment(options).then(res => {
        if (res.code === 200) {
          res.data.cuid = {
            pic: this.$store.state.userInfo.pic,
            nickName: this.$store.state.userInfo.nickName
          };
          this.comments.unshift(res.data);
          this.userComment = "";
          this.cancelPublish();
          setTimeout(() => {
            this.$pop("", "发表评论成功！");
          }, 500);
        }
      });
    },
    receiveCode(val, valid) {
      this.code = val;
      this.valid = valid;
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  background-color: #fff;
  padding: 5px 20px;
}
.user-favs {
  color: #ff5722;
}
.media-heading {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  .layui-btn-sm {
    width: 60px !important;
  }
}
.comment-box {
  width: 100%;
  height: 90px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #fafafa;
  resize: none;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
}
.comment-box-ctr {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}
.btns {
  padding: 5px 0;
}

.comment-items {
  .media {
    position: relative;
    height: auto;
    padding-left: 50px;
    &:after {
      content: " ";
      display: block;
      height: 1px;
      width: calc(100% - 50px);
      background-color: #fafafa;
      position: absolute;
      bottom: -5px;
    }
  }
  .media-avatar {
    position: absolute;
    top: -5px;
    left: 0;
    img {
      border-radius: 50%;
    }
  }
}
.comment-heading {
  border-left: 3px solid #ff5722;
  padding-left: 15px;
  margin: 20px 0;
}
.expression {
  span {
    position: relative;
    top: -4px;
    margin-left: 8px;
  }
}

.pop-captcha {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}
.captcha-container {
  width: 500px;
  height: 230px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .layui-btn-container {
    text-align: right;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
