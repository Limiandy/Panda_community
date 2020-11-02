import { getList } from "@/api/content";

export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let catalog = this.$route.params["catalog"];
      if (typeof catalog !== "undefined" && catalog !== "") {
        this.catalog = catalog;
      }
      this.page = 0;
      this.lists = [];
      this.isEnd = false;
      this._gitLists();
    },
    _gitLists() {
      if (this.isRepeat) return;
      if (this.isEnd) return;
      this.isRepeat = true;
      let options = {
        catalog: this.catalog,
        isTop: this.isTop,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.status
      };
      getList(options)
        .then(res => {
          // 对于异常的判断，res.code !== 200 时，给用户一个提示
          // 判断lists的长度是否为0，如果为零即可直接赋值
          // 如果长度不为0，后面请求到的数据需要添加到lists中
          if (res.code === 200) {
            this.isRepeat = false;
            // 判断 res.data 的长度，如果小于limit 则说明已经到了最后一页
            res.data.length < this.limit
              ? (this.isEnd = true)
              : (this.isEnd = false);
            this.lists.length === 0
              ? (this.lists = res.data)
              : (this.lists = this.lists.concat(res.data));
          }
        })
        .catch(err => {
          console.log(err);
          this.isRepeat = false;
          this.$alert(err.message);
        });
    },

    search(val) {
      if (typeof val === "undefined" && this.current === "") {
        return;
      }
      this.current = val;
      switch (val) {
        case 0:
          this.status = "0";
          this.tag = "";
          break;
        case 1:
          this.status = "1";
          this.tag = "";
          break;
        case 2:
          this.status = "";
          this.tag = "精华";
          break;
        case 3:
          this.sort = "created";
          break;
        case 4:
          this.sort = "answer";
          break;
        default:
          this.status = "";
          this.tag = "";
          this.current = "";
      }
    },
    nextPage() {
      this.page++;
      this._gitLists();
    }
  },
  watch: {
    current() {
      this.init();
    },
    $route() {
      let catalog = this.$route.params["catalog"];
      if (typeof catalog !== "undefined" && catalog !== "") {
        this.catalog = catalog;
      }
      this.init();
    }
  }
};
