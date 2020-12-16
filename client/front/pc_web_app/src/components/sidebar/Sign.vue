<template>
  <div class="layui-card">
    <div class="layui-card-header">
      签到
      <a href="javascript:void(0)" class="panda-link" @click="pop('exp')">说明</a>
      <i class="panda-mid"></i>
      <a href="javascript:void(0)" class="panda-link" @click="pop('active')"
        >活跃榜<span class="layui-badge-dot"></span
      ></a>
      <span class="panda-signin-days" v-show="isSign || isLogin"
        >已连续签到<cite>{{ count }}</cite
        >天</span
      >
    </div>
    <div class="layui-card-body">
      <template v-if="!isSign">
        <button class="layui-btn layui-btn-danger" @click="sign()">
          今日签到
        </button>
        <span style="margin-left: 15px"
          >可获得<cite>{{ favs }}</cite
          >飞吻</span
        >
      </template>

      <!-- 已签到状态 -->
      <template v-else>
        <button class="layui-btn layui-btn-disabled">
          <span style="margin-right: 5px">今日已签到</span>{{ countDown }}
        </button>
        <span style="margin-left: 15px"
          >获得了<cite>{{ favs }}</cite
          >飞吻</span
        >
      </template>
    </div>

    <pop-up title="签到说明" :isShow="isShowExp" @close="close('exp')">
      <div class="pop-explain-content">
        <blockquote class="layui-elem-quote">
          "签到"可获得社区爱心，规则如下
        </blockquote>
        <table class="layui-table">
          <thead>
            <tr>
              <td>连续签到天数</td>
              <td>每天可获得爱心</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&lt;5</td>
              <td>5</td>
            </tr>
            <tr>
              <td>&ge;5</td>
              <td>10</td>
            </tr>
            <tr>
              <td>&ge;15</td>
              <td>15</td>
            </tr>
            <tr>
              <td>&ge;30</td>
              <td>20</td>
            </tr>
            <tr>
              <td>&ge;100</td>
              <td>30</td>
            </tr>
            <tr>
              <td>&ge;365</td>
              <td>50</td>
            </tr>
          </tbody>
        </table>
        <ul>
          <li>中间若有间隔，则连续天数重新计算</li>
          <li>不可利用程序自动签到，否则爱心清零</li>
        </ul>
      </div>
    </pop-up>
    <pop-up
      title="签到活跃榜 - TOP20"
      :isShow="isShowActive"
      @close="close('active')"
    >
      <div class="pop-active-content">
        <div class="layui-tab">
          <ul class="layui-tab-title">
            <li :class="{ 'layui-this': current === 0 }" @click="choose(0)">
              最新签到
            </li>
            <li :class="{ 'layui-this': current === 1 }" @click="choose(1)">
              今日最快
            </li>
            <li :class="{ 'layui-this': current === 2 }" @click="choose(2)">
              总签到榜
            </li>
          </ul>
          <div class="layui-tab-content">
            <ul class="layui-tab-item layui-show">
              <li
                class="new-sign-lists"
                v-for="(item, index) in newSignList"
                :key="'newSign' + index"
              >
                <img class="sign-list-img" src="/header-310.png" alt="" />
                <cite class="panda-link">{{ item.name }}</cite>
                <span style="color: #ccc" v-if="current !== 2"
                  >签到于<i>{{ item.created }}</i></span
                >
                <span style="color: #ccc" v-else
                  >已经连续签到<i style="color: #ff9900">{{ item.count }}</i
                  >天了</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </pop-up>
  </div>
</template>

<script>
import PopUp from "@/components/PopUp/index";
import { userSign } from "@/api/user.js";
import moment from "dayjs";
import duration from "dayjs/plugin/duration";
moment.extend(duration);

export default {
  name: "Sign",
  components: {
    PopUp
  },
  computed: {
    count() {
      if (this.$store.state.userInfo !== {}) {
        if (typeof this.$store.state.userInfo.count !== "undefined") {
          return this.$store.state.userInfo.count;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    },
    favs() {
      let count = parseInt(this.count);
      let result = 0;
      if (count < 5) {
        result = 5;
      } else if (count >= 5 && count < 15) {
        result = 10;
      } else if (count >= 15 && count < 30) {
        result = 15;
      } else if (count >= 30 && count < 100) {
        result = 20;
      } else if (count >= 100 && count < 365) {
        result = 30;
      } else if (count >= 365) {
        result = 50;
      }
      return result;
    },
    // 倒计时计算属性，监测当前时间的变化，动态计算剩余时间
    countDown() {
      const diff = moment(this.end).diff(this.now);
      const du = moment.duration(diff);
      const hours = du.hours();
      const mins = du.minutes();
      const ss = du.seconds();
      if (hours <= 0 && mins <= 0 && ss <= 0) {
        this.allowSign();
        return;
      } else {
        return `${hours}:${mins}:${ss}`;
      }
    }
  },
  data() {
    return {
      isShowExp: false,
      isShowActive: false,
      isSign: false,
      isLogin: this.$store.state.isLogin,
      now: moment(),
      end: moment(this.now)
        .add(1, "day")
        .format("YYYY-MM-DD 00:00:00"),
      // end: moment().add(10, "seconds"),
      tiemr: setInterval(() => {
        this.now = moment();
      }, 1000),
      current: 0,
      newSignList: [
        {
          name: "andy",
          count: 20,
          created: "2020-10-11"
        },
        {
          name: "andy",
          count: 20,
          created: "2020-10-11"
        },
        {
          name: "andy",
          count: 20,
          created: "2020-10-11"
        }
      ]
    };
  },
  mounted() {
    this.allowSign();
    this.tiemr;
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    close(v) {
      switch (v) {
        case "exp":
          this.isShowExp = false;
          break;
        case "active":
          this.isShowActive = false;
          break;
      }
    },
    pop(v) {
      switch (v) {
        case "exp":
          this.isShowExp = true;
          break;
        case "active":
          this.isShowActive = true;
          break;
      }
    },
    choose(v) {
      this.current = v;
    },
    sign() {
      if (!this.isLogin) {
        this.$pop("shake", "请先登录");
        return;
      }
      userSign().then(res => {
        let user = this.$store.state.userInfo;
        if (res.code === 200) {
          user.favs = res.data.favs;
          user.count = res.data.count;
          this.$pop("", "签到成功");
        }
        if (res.code === 50001) {
          this.$pop("", "今日已签到");
        }
        user.isSign = true;
        user.lastSign = res.lastSign;
        this.isSign = true;
        this.$store.commit("setUserInfo", user);
      });
    },
    allowSign() {
      // 判断用户的上一次签到时间与签到状态
      // 如果用户上一次签到时间与当天的签到日期相差1天，则允许用户签到
      const isSign = this.$store.state.userInfo.isSign;
      const lastSign = this.$store.state.userInfo.lastSign;
      const nowDate = moment().format("YYYY-MM-DD");
      const lastDate = moment(lastSign).format("YYYY-MM-DD");
      const diff = moment(nowDate).diff(moment(lastDate), "day");
      if (diff > 0 && isSign) {
        this.isSign = false;
      } else {
        this.isSign = isSign;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.panda-mid {
  &:before {
    content: " ";
    width: 1px;
    background-color: #b2b2b2;
    display: inline-block;
    height: 15px;
    position: relative;
    top: 2px;
    margin: 0 2px;
  }
}

.panda-link {
  color: #d2d2d2;
}

.layui-card-header {
  position: relative;
}

.panda-signin-days {
  position: absolute;
  right: 5px;
  cite {
    color: #ff5722;
  }
}

.pop-explain-content {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 3px;
  .layui-elem-quote {
    padding: 6px;
    margin-bottom: 5px !important;
  }
  .layui-table {
    margin-top: 0;
    td {
      padding: 3px;
    }
  }
  ul {
    width: 100%;
    box-sizing: border-box;
    li {
      list-style-type: disc !important;
      list-style-position: inside;
      font-size: 12px;
      margin-bottom: 5px;
      &:nth-last-child(1) {
        color: red;
      }
    }
  }
}
.pop-active-content {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 3px;
  .layui-tab-title {
    li {
      padding: 0 8px;
    }
  }
  .new-sign-lists {
    margin-bottom: 5px;
    border-bottom: 1px dotted #dcdcdc;
    &:last-child {
      border-bottom: none;
    }
  }
  .sign-list-img {
    width: 30px;
    height: 30px;
    border-radius: 2px;
    margin-right: 10px;
  }
}
</style>
