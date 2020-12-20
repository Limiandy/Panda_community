<template>
  <div>
    <div id="my_home" v-show="isShow">
      <div class="layui-row">
        <div class="user-info">
          <div class="user-avatar">
            <img
              :src="userInfo.pic === '' ? '/header-k.jpg' : userInfo.pic"
              alt="我的头像"
            />
          </div>
          <p>
            <span class="f-s-16 f-w-600">
              <i
                class="iconfont"
                :class="'icon-vip' + userInfo.isVip"
                style="color: #ff5722"
              ></i
              >{{ userInfo.nickName }}</span
            >
            <span>
              <i
                class="iconfont icon-nan f-w-700"
                style="color: #6FB1F9;"
                v-if="userInfo.gender === 'male'"
              ></i>
              <i
                class="iconfont icon-nv4-copy f-w-700 f-s-18"
                style="color: #E563A7;"
                v-if="userInfo.gender === 'fmale'"
              ></i>
            </span>
          </p>
          <p>
            <span>积分：{{ userInfo.favs }}</span>
            <span
              ><i class="iconfont icon-shijian f-s-14"></i>
              {{ userInfo.created | moment }} 加入</span
            >
            <span
              ><i class="iconfont icon-zuobiao"></i> 来自{{
                userInfo.location !== "" ? userInfo.location : "一个未知的地方"
              }}</span
            >
          </p>
          <p class="reg-mark" :title="userInfo.regmark">
            ({{
              userInfo.regmark !== ""
                ? userInfo.regmark
                : "这家伙很懒，什么都没留下"
            }})
          </p>
          <p>
            <button class="layui-btn layui-btn-primary">加为好友</button>
            <button class="layui-btn">发起会话</button>
          </p>
        </div>
      </div>
      <div class="layui-container">
        <div class="layui-row layui-col-space10">
          <div class="layui-col-md6">
            <div class="layui-card">
              <div class="layui-card-header">
                <span class="f-w-600">{{ userInfo.nickName }}</span>
                最近发布的文章
              </div>
              <div class="layui-card-body">
                <ul class="post-info">
                  <li
                    class="text-middle"
                    v-for="(item, index) in postInfo"
                    :key="'post' + index"
                  >
                    <router-link
                      :to="{ name: 'Detail', params: { tid: item._id } }"
                    >
                      <span
                        class="layui-badge"
                        v-if="
                          item.tags.length !== 0 &&
                            item.tags.some(el => {
                              if (el.name === '精华') {
                                return true;
                              }
                            })
                        "
                        >精</span
                      >
                      <span class="post-title" title="">{{ item.title }}</span>
                      <span class="post-created">{{
                        item.created | moment
                      }}</span>
                      <span class="post-count"
                        >{{ item.answer }}阅/{{ item.reads }}答</span
                      >
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="layui-col-md6">
            <div class="layui-card">
              <div class="layui-card-header">
                <span class="f-w-600">{{ userInfo.nickName }}</span>
                最近的回答
              </div>
              <div class="layui-card-body">
                <div v-if="commentInfo === ''">
                  这家伙还没有回答过任何人的问题...
                </div>
                <ul class="comment-info">
                  <li
                    v-for="(item, index) in commentInfo"
                    :key="'comment' + index"
                  >
                    <p class="comment-title">
                      <span>{{ item.created | moment }}</span> 在
                      <router-link
                        :to="{ name: 'Detail', params: { tid: item.tid._id } }"
                        >{{ item.tid.title }}</router-link
                      >
                      中回答：
                    </p>
                    <div class="comment-content">
                      <pre>{{ item.content }}</pre>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" v-show="!isShow"></div>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/user";
import { getPublicPost } from "@/api/content";
import { getPublicComment } from "@/api/comments";

export default {
  name: "MyHome",
  props: ["uid"],
  data() {
    return {
      userInfo: "",
      postInfo: "",
      commentInfo: "",
      isShow: false
    };
  },
  mounted() {
    this._getUserInfo();
    this._getPostInfo();
    this._getPublicComment();
  },
  methods: {
    // 请求用户信息
    _getUserInfo() {
      // 不同用户之间的访问
      if (this.uid && this.uid !== this.$store.state.userInfo._id) {
        getUserInfo({ uid: this.uid })
          .then(res => {
            if (res.code === 200) {
              this.userInfo = res.data;
              this.isShow = true;
            } else {
              console.log("请求失败");
            }
          })
          .catch(err => {
            if (err) {
              this.$alert("没有该用户", () => {
                this.$router.push("/");
              });
            }
          });
        return;
      }

      // 自己访问自己
      if (this.uid && this.uid === this.$store.state.userInfo._id) {
        this.userInfo = this.$store.state.userInfo;
        this.isShow = true;
      } else {
        this.$alert("请登录", () => {
          this.$router.push("/login");
        });
      }
    },
    // 请求最新发表的文章
    _getPostInfo() {
      getPublicPost({ uid: this.uid }).then(res => {
        if (res.code === 200) {
          this.postInfo = res.data;
        }
      });
    },
    // 请求用户的评论列表
    _getPublicComment() {
      getPublicComment(this.uid).then(res => {
        if (res.code === 200) {
          this.commentInfo = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#my_home {
  background-color: #f0f0f0;
  padding-bottom: 10px;
}

#my_home > .layui-row {
  margin-bottom: 10px;
  padding: 5px 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.user-info {
  flex: 1;
  text-align: center;
}
.user-info .user-avatar {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  img {
    display: block;
    width: 100%;
    border-radius: 50%;
    border: 2px solid transparent;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
  }
}

.user-info p {
  padding: 5px 0;
  span {
    margin: 0 5px;
  }
}

.reg-mark {
  margin: 0 auto;
  text-align: center;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.post-info {
  li {
    position: relative;
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #d2d2d2;
    .layui-badge {
      margin-right: 5px;
      position: relative;
      top: -1px;
    }
    a {
      color: #333333;
    }
    .post-created {
      color: #b2b2b2;
    }
    .post-count {
      position: absolute;
      right: 0;
      color: #b2b2b2;
    }
  }
}

.post-title {
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 10px;
}

.comment-info {
  li {
    margin-bottom: 10px;
    .comment-content {
      max-height: 150px;
      overflow: hidden;
      background-color: #d2d2d2;
      border-radius: 5px;
      padding: 5px;
      pre {
        background-color: transparent;
      }
    }
  }
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100vw;
  height: 100vh;
}
</style>
