<template>
  <div class="detail-view">
    <van-nav-bar :title="dateStr" fixed>
      <template #left>
        <van-icon name="arrow-left" size="20" color="#bbb" @click="back" />
      </template>
      <template #right>
        <div class="share" @click="share"></div>
      </template>
    </van-nav-bar>

    <div class="photograph-container">
      <div class="photograph-card">
        <img v-lazy="imgUrl" />
        <div class="photograph-desc">
          <h3 class="title">{{ title }} | {{ picInfo }}</h3>
          <p class="forward">{{ forward }}</p>
          <p class="words-info">{{ wordsInfo }}</p>
        </div>
      </div>
      <div class="tool-bar">
        <div class="left-bar"><i class="icon-discovery"></i>小记</div>
        <div class="right-bar">
          <i class="icon-diary_icon"></i>
          <i class="icon-bubble_collect" :class="{ active: isCollect }" @click.stop="collect"></i>
          <div class="like-box">
            <i class="icon-feeds_laud_default" :class="{ active: isLike }" @click.stop="like"></i>
            <span class="like" ref="like">{{ likeCount }}</span>
          </div>
          <i class="icon-feeds_share" @click.stop="share"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHpDetail } from "@/utils/apis/articlecontent";
import { monthEnList } from "@/utils/dateTools";

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      let keyArr = [];
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.slice(0, 2) == "hp") {
          keyArr.push(key.slice(3));
        }
      }
      vm.keyArr = keyArr;
    });
  },

  data() {
    return {
      imgUrl: "",
      title: "",
      picInfo: "",
      forward: "",
      wordsInfo: "",
      likeCount: null,
      date: "",
      isCollect: false,
      id: "",
      volume: "",
      keyArr: [],
      isLike: false,
    };
  },

  computed: {
    dateObj() {
      let res = null;
      let date = new Date(this.date);
      let m = date.getMonth();
      let d = date.getDate();
      d = d >= 10 ? d : "0" + d;
      res = {
        year: date.getFullYear(),
        month: monthEnList[m],
        day: d,
      };
      return res.day + " " + res.month + "." + res.year;
    },

    dateStr() {
      return this.$route.query.date?.split("-").join(" / ");
    },
  },

  methods: {
    collectYesOrNo() {
      this.isCollect = false;
      this.$nextTick(() => {
        let index = this.keyArr.indexOf(this.date);
        if (index > -1) {
          this.isCollect = true;
        }
      });
    },

    collect() {
      if (this.isCollect == false) {
        let key = "hp-" + this.date;
        let value = {
          id: this.id,
          imgUrl: this.imgUrl,
          forward: this.forward,
          volume: this.volume,
          dateObj: this.dateObj,
          date: this.date,
        };
        value = JSON.stringify(value);
        localStorage[key] = value;
        this.isCollect = true;
        this.$toast({
          message: "已收藏至个人中心",
          position: "bottom",
        });
      } else {
        let key = "hp-" + this.date;
        localStorage.removeItem(key);
        this.isCollect = false;
        this.$toast({
          message: "取消收藏",
          position: "bottom",
        });
      }
    },

    like() {
      if (this.isLike == false) {
        this.isLike = true;
        this.$refs.like.textContent++;
      } else {
        this.isLike = false;
        this.$refs.like.textContent--;
      }
    },

    back() {
      this.$router.go(-1);
    },
    share() {
      this.$router.push("/share");
    },

    saveArticleDataUseSessionStorage(date) {
      let key = "hp-" + date;
      let value = {
        imgUrl: this.imgUrl,
        title: this.title,
        picInfo: this.picInfo,
        forward: this.forward,
        wordsInfo: this.wordsInfo,
        likeCount: this.likeCount,
        id: this.id,
        volume: this.volume,
      };
      value = JSON.stringify(value);
      sessionStorage[key] = value;
    },

    getArticleDataAndRatingsData() {
      let date = this.$route.query.date;
      this.date = date;
      let articleData = sessionStorage["hp-" + date];
      if (articleData) {
        // console.log("本地");
        articleData = JSON.parse(articleData);
        this.imgUrl = articleData.imgUrl;
        this.title = articleData.title;
        this.picInfo = articleData.picInfo;
        this.forward = articleData.forward;
        this.wordsInfo = articleData.wordsInfo;
        this.likeCount = articleData.likeCount;
        this.id = articleData.id;
        this.volume = articleData.volume;
      } else {
        // console.log("网络");
        getHpDetail({
          axios: this.$axios,
          date,
        }).then(({ data }) => {
          // console.log(data.data);
          let res = data.data;
          this.imgUrl = res.img_url;
          this.title = res.title;
          this.picInfo = res.pic_info;
          this.forward = res.forward;
          this.wordsInfo = res.words_info;
          this.likeCount = res.like_count;
          this.id = res.item_id;
          this.volume = res.volume;
          this.saveArticleDataUseSessionStorage(date);
        });
      }
    },
  },

  activated() {
    // console.log("页面激活");
    this.collectYesOrNo();
    let date = this.$route.query.date;
    if (this.date == date) {
      return;
    }
    this.getArticleDataAndRatingsData();
  },
};
</script>

<style lang="scss" scoped>
.detail-view {
  position: fixed;
  top: 46px;
  width: 100vw;
  height: calc(100vh - 46px);
  background-color: #fff;
  z-index: 50;

  .share {
    width: 20px;
    height: 20px;
    background-size: 20px 20px;
    background-image: url(../assets/img/share_image.png);
  }

  .photograph-container {
    width: 100%;
    padding: 12px;
    background-color: #fff;

    .photograph-card {
      width: 100%;

      img {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        width: 100%;
      }

      .photograph-desc {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        padding: 10px 20px 30px;
        box-shadow: 0px 1px 9px #ddd;

        .title,
        .words-info {
          text-align: center;
          font-size: 14px;
          color: #aaa;
        }

        .forward {
          margin-top: 30px;
          margin-bottom: 100px;
          word-break: break-all;
          font-size: 15px;
          line-height: 28px;
        }
      }
    }

    .tool-bar {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      padding: 10px 5px;
      font-size: 12px;
      color: #999;
      line-height: 20px;

      .right-bar {
        flex: 1;
        margin-left: 100px;
        display: flex;
        justify-content: space-between;
      }

      i {
        display: inline-block;
        vertical-align: top;
        margin-right: 3px;
        width: 20px;
        height: 20px;
        background-size: 20px 20px;
        background-position: center center;
        background-repeat: no-repeat;
      }

      .icon-discovery {
        background-image: url(../assets/img/article/discovery.png);
      }

      .icon-diary_icon {
        background-image: url(../assets/img/article/diary_icon.png);
      }

      .icon-bubble_collect {
        background-image: url(../assets/img/article/bubble_collect.png);
        background-size: 16px 20px;

        &.active {
          background-image: url(../assets/img/article/bubble_collected.png);
        }
      }

      .icon-feeds_laud_default {
        background-image: url(../assets/img/article/feeds_laud_default.png);

        &.active {
          background-image: url(../assets/img/article/feeds_laud_selected.png);
        }
      }

      .icon-feeds_share {
        background-image: url(../assets/img/article/feeds_share.png);
        background-size: 18px 18px;
      }
    }
  }
}
</style>