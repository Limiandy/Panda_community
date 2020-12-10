<template>
  <div class="detail">
    <panel />
    <div class="layui-container">
      <div class="layui-row layui-col-space10">
        <div class="layui-col-md8 ">
          <div class="panda-post-wrap panda-bg-white panda-p-1" v-if="loading">
            <header>
              <h2 class="post-title">{{ postDetail.title }}</h2>
              <div class="post-info panda-mt-1">
                <div class="post-labels">
                  <span
                    class="layui-badge layui-bg-black"
                    v-if="postDetail.isTop === '1'"
                    >置顶</span
                  ><span
                    class="layui-badge layui-bg-gray"
                    v-if="parseInt(postDetail.isEnd) === 1"
                    >已结</span
                  >
                  <span
                    class="layui-badge layui-bg-gray"
                    v-if="parseInt(postDetail.isEnd) === 0"
                    >未结</span
                  >
                  <span class="layui-badge layui-bg-green">{{
                    postDetail.catalog | catalog
                  }}</span>
                  <template v-for="(item, index) in postDetail.tags">
                    <span
                      :key="'tags' + index"
                      v-if="postDetail.tags"
                      class="layui-badge"
                      :class="item.class"
                      >{{ item.name }}</span
                    >
                  </template>
                </div>
                <div
                  class="post-controllers"
                  v-if="isAdmin && isAdmin === 'admin'"
                >
                  <button class="layui-btn layui-btn-xs layui-btn-danger">
                    删除
                  </button>
                  <button class="layui-btn layui-btn-xs layui-btn-normal">
                    置顶
                  </button>
                  <button class="layui-btn layui-btn-xs layui-btn-warm">
                    加精
                  </button>
                </div>
                <div class="post-count">
                  <span class="count-comment"
                    ><i class="iconfont icon-review"></i>
                    {{ postDetail.answer }}</span
                  >
                  <span class="count-reads"
                    ><i class="iconfont icon-chakan"></i>
                    {{ postDetail.reads }}</span
                  >
                </div>
              </div>
            </header>
            <div class="post-user-info panda-mt-1">
              <a href="user/home.html" class="panda-avatar">
                <img :src="postDetail.uid.pic" :alt="postDetail.uid.nickName" />
              </a>
              <div class="post-user-content">
                <div class="user-group">
                  <a href="user/home.html" class="panda-link">
                    <i
                      class="iconfont icon-isVip"
                      :class="[
                        { 'icon-vip0': postDetail.uid.isVip === '0' },
                        { 'icon-vip1': postDetail.uid.isVip === '1' },
                        { 'icon-vip2': postDetail.uid.isVip === '2' },
                        { 'icon-vip3': postDetail.uid.isVip === '3' },
                        { 'icon-vip4': postDetail.uid.isVip === '4' },
                        { 'icon-Vip': postDetail.uid.isVip === '5' },
                        { 'icon-vip6': postDetail.uid.isVip === '6' },
                        { 'icon-vip7': postDetail.uid.isVip === '7' },
                        { 'icon-vip8': postDetail.uid.isVip === '8' },
                        { 'icon-vip9': postDetail.uid.isVip === '9' }
                      ]"
                      title="认证信息：XXX"
                    ></i>
                    <cite>{{ postDetail.uid.nickName }}</cite>
                  </a>

                  <!-- TODO: 这里需要后端返回悬赏积分的数据后做更改 -->
                  <span class="panda-list-kiss layui-hide-xs" title="悬赏飞吻"
                    >悬赏：60积分</span
                  >
                </div>
                <div class="time-group">
                  <span>2020-11-6</span>
                  <span class="layui-badge layui-bg-green">编辑过此帖</span>
                </div>
              </div>
            </div>
            <div class="layui-btn-container panda-pt-1">
              <!-- TODO: 这是需要判断当前登录的用户是不是这个文章的拥有者 -->
              <a href="javascript:void(0)" class="layui-btn layui-btn-sm"
                >编辑</a
              >
              <a
                href="javascript:void(0)"
                class="layui-btn layui-btn-sm"
                style="margin-right: 0"
                >收藏</a
              >
            </div>
            <hr />
            <div class="post-content panda-mt-2" v-html="replaceContent"></div>
          </div>

          <!-- 回帖列表 -->
          <div class="panda-post-comment panda-bg-white" v-if="commentLoading">
            <ul class="comment-list">
              <li
                class="comment-list-item"
                v-for="(item, index) in comments"
                :key="'comments' + index"
              >
                <div class="comment-list-info">
                  <a href="javascript:void(0)" class="comment-avatar">
                    <img :src="item.cuid.pic" :alt="item.cuid.nickName" />
                  </a>
                  <a href="javascript:void(0)" class="panda-link">
                    <i
                      class="iconfont icon-isVip"
                      :class="[
                        { 'icon-vip0': postDetail.uid.isVip === '0' },
                        { 'icon-vip1': postDetail.uid.isVip === '1' },
                        { 'icon-vip2': postDetail.uid.isVip === '2' },
                        { 'icon-vip3': postDetail.uid.isVip === '3' },
                        { 'icon-vip4': postDetail.uid.isVip === '4' },
                        { 'icon-Vip': postDetail.uid.isVip === '5' },
                        { 'icon-vip6': postDetail.uid.isVip === '6' },
                        { 'icon-vip7': postDetail.uid.isVip === '7' },
                        { 'icon-vip8': postDetail.uid.isVip === '8' },
                        { 'icon-vip9': postDetail.uid.isVip === '9' }
                      ]"
                      title="认证信息：XXX"
                    ></i>
                    <cite>{{ item.cuid.nickName }}</cite>
                  </a>
                  <span>{{ item.created | moment }}</span>
                  <div class="adopt" v-if="item.isBest !== '0'">
                    <i class="iconfont icon-yicaina"></i>
                  </div>
                </div>
                <div class="comment-list-content">
                  <p>{{ item.content }}</p>
                </div>
                <div class="comment-controllers">
                  <div class="left-ctrl">
                    <a href="javascript:void (0)"
                      ><i class="iconfont icon-dianzan-copy click-apt"></i
                      >{{ item.hands }}</a
                    >
                    <a href="javascript:void (0)"
                      ><i class="iconfont icon-dislike"></i>10</a
                    >
                    <a href="javascript:void (0)"
                      ><i class="iconfont icon-review"></i>20</a
                    >
                  </div>
                  <div class="right-ctrl">
                    <a href="javascript:void (0)">编辑</a>
                    <a href="javascript:void (0)">删除</a>
                    <a href="javascript:void (0)">采纳</a>
                  </div>
                </div>
              </li>
            </ul>
            <paging :pos="'center'" />
            <form class="layui-form layui-form-pane">
              <editor :height="200" />
              <captcha :input="code" @updateVal="updateVal" />
              <button class="layui-btn" type="submit">提交回复</button>
            </form>
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
  </div>
</template>

<script>
import { getDetail } from "@/api/content";
import { getComments } from "@/api/comments";
import { escapeHtml } from "@/utils/escapeHtml";
import Panel from "@/components/Panel/index";
import { HotList, Ads, Links } from "@/components/sidebar/index";
import AuthorInfo from "@/components/sidebar/AuthorInfo";
import Editor from "@/components/modules/editor1/index";
import Captcha from "@/components/Captcha/index";
import Paging from "@/components/Paging";

import moment from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
moment.extend(relativeTime);
export default {
  name: "Detail",
  components: {
    AuthorInfo,
    HotList,
    Ads,
    Links,
    Panel,
    Editor,
    Captcha,
    Paging
  },
  props: ["tid"],
  data() {
    return {
      code: "",
      postDetail: {},
      comments: [],
      content: "",
      isAdmin: "",
      loading: false,
      commentLoading: false
    };
  },
  computed: {
    replaceContent() {
      if (
        typeof this.postDetail.content === "undefined" ||
        this.postDetail.content.trim() === ""
      ) {
        return;
      }
      return escapeHtml(this.postDetail.content);
    }
  },
  beforeMount() {
    this._getDetail();
  },
  mounted() {
    this._getComments();
  },
  methods: {
    updateVal(val) {
      this.code = val;
    },
    _getDetail() {
      getDetail(this.tid)
        .then(res => {
          if (res.code === 200) {
            this.postDetail = res.data;
            this.isAdmin = res.isAdmin;
            this.loading = true;
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
          setTimeout(() => {
            this.commentLoading = true;
          }, 500);
        }
      });
    }
  },
  filters: {
    catalog(v) {
      switch (v) {
        case "ask":
          return "提问";
        case "advise":
          return "建议";
        case "discuss":
          return "讨论";
        case "share":
          return "分享";
        case "news":
          return "动态";
        case "notict":
          return "公告";
      }
    },
    moment(date) {
      if (moment(date).isBefore(moment().subtract(7, "days"))) {
        return moment(date).format("YYYY-MM-DD");
      } else {
        return moment(date)
          .locale("zh-cn")
          .from(moment());
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.panda-post-wrap {
  margin-bottom: 15px;
}
.post-info {
  display: flex;
  flex-wrap: nowrap;
  .post-labels {
    flex: 2;
    span {
      margin-right: 5px;
    }
  }
  .post-controllers {
    flex: 2;
  }
  .post-count {
    flex: 2;
    text-align: right;
    span {
      margin-left: 12px;
    }
  }
}

.layui-btn-container {
  text-align: right;
}
.post-user-info {
  position: relative;
  width: 100%;
  height: 55px;
  box-sizing: border-box;
  background-color: #f3f2f3;
}
.panda-avatar {
  left: 2px;
  top: 3px;
  img {
    border: 2px solid #fff;
  }
}
.post-user-content {
  margin-left: 60px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .user-group,
  .time-group {
    display: flex;
    flex-flow: column;
    justify-content: center;
    height: 100%;
  }
}

.panda-post-comment {
  padding: 5px 5px 40px;
}
.comment-list {
  margin-bottom: 25px;
  background-color: #e6e6e6;
}
.comment-list-item {
  padding: 5px;
  margin-bottom: 25px;
  background-color: #fff;

  .comment-list-info {
    display: flex;
    flex-flow: nowrap;
    align-items: center;
    position: relative;
    .comment-avatar {
      margin-right: 5px;
      img {
        display: block;
        width: 45px;
        height: 45px;
        border-right: 2px;
      }
    }
    .panda-link {
      margin-right: 15px;
    }
    .adopt {
      position: absolute;
      right: 10px;
      top: 5px;
      i {
        color: #5fb878;
        font-size: 55px;
      }
    }
  }
  .comment-list-content {
    margin: 10px 0;
    p {
      letter-spacing: 2px;
    }
  }
  .comment-controllers {
    color: #ccc;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    .left-ctrl {
      a {
        margin-right: 10px;
        i {
          margin-right: 3px;
          font-size: 14px;
        }
      }
    }
    .right-ctrl {
      a {
        margin-left: 15px;
      }
    }
  }
}
.click-apt {
  color: orangered;
}
</style>
