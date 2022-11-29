<template>
  <div class="user-login-view">
    <div class="pic"></div>
    <div class="user">
      <div class="user-img"></div>
      <div class="name">{{ userName }}</div>
    </div>

    <div class="diary">
      <div class="diary-text1">我的小记</div>
      <div class="diary-text2">全部 <van-icon name="arrow" /></div>
    </div>
    <div class="diary-img" @click="test"></div>
    <div class="collect">
      <div class="collect-title">我的收藏</div>
      <div class="collect-list">
        <div
          class="collect-item"
          v-for="(c, i) in collectList"
          :key="c"
          @click="collectType(c, i)"
        >
          <div class="collect-icon"></div>
          <div class="collect-name">{{ c }}</div>
        </div>
      </div>
    </div>
    <div class="content-list">
      <div
        class="content-item"
        v-for="(c, i) in contenttList"
        :key="c"
        @click="contentType(c, i)"
      >
        <div class="content-icon"></div>
        <div class="content-name">{{ c }}</div>
        <van-icon name="arrow" class="content-arrow" />
      </div>
    </div>
    <transition name="move">
      <router-view :collectTitle="collectTitle" :contentTitle="contentTitle" />
    </transition>
  </div>
</template>

<script>
import { collectTypes, contentTypes } from "@/utils/apis/articlecontent";

export default {
  data() {
    return {
      collectList: ["图文", "文章", "音乐", "影视", "电台"],
      contenttList: ["我的关注", "歌单", "投稿", "设置"],
      collectTitle: "",
      contentTitle: "",
    };
  },

  computed: {
    userName() {
      return localStorage.userRegister;
    },
  },

  methods: {
    test() {
      this.$router.push("/share");
    },

    collectType(c, i) {
      this.collectTitle = c;
      let category = collectTypes[i];
      this.$router.push({
        path: "/user/userLogin/collectDetail",
        query: {
          category,
        },
      });
    },

    contentType(c, i) {
      this.contentTitle = c;
      let category = contentTypes[i];
      this.$router.push({
        path: "/user/userLogin/contentDetail",
        query: {
          category,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-login-view {
  position: fixed;
  width: 100vw;
  height: calc(100vh - 55px);
  top: 0;
  z-index: 100;
  background-color: #fff;

  .pic {
    width: 100%;
    height: 150px;
    background-size: 100% 200px;
    background-image: url(@/assets/img/default_indi_bg.png);
  }

  .user {
    position: absolute;
    top: 80px;
    display: flex;
    height: 50px;
    align-items: center;

    .user-img {
      width: 50px;
      height: 50px;
      border-radius: 999px;
      margin: 0 15px;
      background-size: 50px 50px;
      background-image: url(@/assets/img/user.jpg);
    }
  }

  .diary {
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;

    .diary-text1 {
      font-size: 14px;
    }

    .diary-text2 {
      font-size: 12px;
      color: #999;
    }
  }

  .diary-img {
    width: 100%;
    height: 100px;
    background-size: 114px 80px;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url(@/assets/img/diary.jpg);
  }

  .collect-title {
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    font-size: 14px;
  }

  .collect-list {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .collect-icon {
      width: 50px;
      height: 50px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 30px 36px;
    }

    .collect-name {
      font-size: 12px;
      color: #555;
      text-align: center;
      margin: 3px 0 15px 0;
    }

    .collect-item:nth-of-type(1) .collect-icon {
      background-image: url(@/assets/img/indi_hp_icon.png);
    }

    .collect-item:nth-of-type(2) .collect-icon {
      background-image: url(@/assets/img/indi_article_icon.png);
    }

    .collect-item:nth-of-type(3) .collect-icon {
      background-image: url(@/assets/img/indi_music_icon.png);
    }

    .collect-item:nth-of-type(4) .collect-icon {
      background-image: url(@/assets/img/indi_movie_icon.png);
    }

    .collect-item:nth-of-type(5) .collect-icon {
      background-image: url(@/assets/img/indi_radio_icon.png);
    }
  }

  .content-list {
    height: calc(100% - 410px);
    padding-top: 10px;
    background-color: #efefef;
    font-size: 14px;

    .content-item {
      display: flex;
      align-items: center;
      height: 40px;
      background-color: #fff;
      padding: 0 15px;
      border: 1px solid rgba(238, 238, 238, 0.5);

      .content-icon {
        width: 20px;
        height: 20px;
        background-size: cover;
      }

      .content-name {
        margin-left: 15px;
      }

      .content-arrow {
        margin-left: auto;
        color: #ccc;
      }
    }

    .content-item:nth-of-type(1) .content-icon {
      background-image: url(@/assets/img/follow.png);
    }

    .content-item:nth-of-type(2) .content-icon {
      background-image: url(@/assets/img/music.png);
    }

    .content-item:nth-of-type(3) .content-icon {
      height: 18px;
      background-image: url(@/assets/img/contribute_day.png);
    }

    .content-item:nth-of-type(4) .content-icon {
      background-image: url(@/assets/img/set.png);
    }
  }

  .move-enter,
  .move-leave-to {
    transform: translatex(100%);
  }

  .move-enter-active,
  .move-leave-active {
    transition: all linear 0.2s;
  }

  .move-leave,
  .move-enter-to {
    transform: translatex(0);
  }
}
</style>

