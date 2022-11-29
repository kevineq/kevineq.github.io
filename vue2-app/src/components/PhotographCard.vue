<template>
  <div class="photograph-container">
    <div class="photograph-card">
      <img v-lazy="listItem.img_url" />
      <div class="photograph-desc">
        <h3 class="title">{{ listItem.title }}|{{ listItem.pic_info }}</h3>
        <p class="forward">{{ listItem.forward }}</p>
        <p class="words-info">{{ listItem.words_info }}</p>
      </div>
    </div>
    <div class="tool-bar">
      <div class="left-bar"><i class="icon-discovery"></i>小记</div>
      <div class="right-bar">
        <i class="icon-diary_icon"></i>
        <i
          class="icon-bubble_collect"
          :class="{ active: isCollect }"
          @click.stop="collect"
        ></i>
        <div class="like-box">
          <i
            class="icon-feeds_laud_default"
            :class="{ active: isLike }"
            @click.stop="like"
          ></i>
          <transition name="move">
            <span class="like" ref="like">{{ listItem.like_count }}</span>
          </transition>
        </div>
        <i class="icon-feeds_share" @click.stop="share"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { monthEnList } from "@/utils/dateTools";

export default {
  props: {
    listItem: Object,
    keyArr: Array,
  },

  data() {
    return {
      isLike: false,
      isCollect: false,
      isShow: true,
    };
  },

  computed: {
    dateObj() {
      let res = null;
      let date = new Date(this.listItem.post_date);
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
  },

  created() {
    this.collectYesOrNo();
  },

  methods: {
    collectYesOrNo() {
      this.$nextTick(() => {
        let index = this.keyArr.indexOf(this.listItem.post_date.split(" ")[0]);
        if (index > -1) {
          this.isCollect = true;
        }
      });
    },

    collect() {
      if (this.isCollect == false) {
        let key = "hp-" + this.listItem.post_date.split(" ")[0];
        let value = {
          id: this.listItem.item_id,
          imgUrl: this.listItem.img_url,
          forward: this.listItem.forward,
          volume: this.listItem.volume,
          dateObj: this.dateObj,
          date: this.listItem.post_date.split(" ")[0],
        };
        value = JSON.stringify(value);
        localStorage[key] = value;
        this.isCollect = true;
        this.$toast({
          message: "已收藏至个人中心",
          position: "bottom",
        });
      } else {
        let key = "hp-" + this.listItem.post_date.split(" ")[0];
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
    share() {
      this.$router.push("/share");
    },
  },
};
</script>

<style lang="scss" scoped>
.photograph-container {
  padding: 12px;
  width: 100vw;
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

      .like-box {
        position: relative;
        display: flex;
        flex: 0 0 50px;

        .like {
          position: absolute;
          right: 0;
          top: 0;
        }

        .move-enter {
          transform: translateY(100%);
        }
        .move-leave-to {
          transform: translateY(-100%);
        }

        .move-enter-active,
        .move-leave-active {
          transition: all linear 0.5s;
        }

        .move-leave,
        .move-enter-to {
          transform: translateY(0);
        }
      }
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
      transform: translateY(-1px);
    }
  }
}
</style>