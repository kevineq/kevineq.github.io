<template>
  <div id="app">
    <keep-alive>
      <router-view
        @set-year="setYear"
        @set-type="setType"
        @set-date="setDate"
        @set-audio-src-and-play="setAudioSrc"
        @play-or-pause="playOrPause"
        :play-state="audioPlayState"
      ></router-view>
    </keep-alive>
    <div class="tab-bar">
      <router-link
        class="tab-bar-item icon-home"
        tag="div"
        :to="'/home/' + date"
      ></router-link>
      <router-link
        class="tab-bar-item icon-discover"
        tag="div"
        :to="'/discover/' + type"
      ></router-link>
      <router-link
        class="tab-bar-item icon-serialize"
        tag="div"
        :to="'/serialize/' + year"
      ></router-link>
      <router-link
        class="tab-bar-item icon-user"
        tag="div"
        to="/user"
      ></router-link>
    </div>
    <audio
      v-if="src"
      :src="src"
      :loop="needLoop"
      ref="audio"
      @canplay="getAudioMetaSource"
      @timeupdate="audioTimeupdate"
      @play="audioPlayState = true"
      @pause="audioPlayState = false"
    />
    <transition name="slide">
      <div
        class="disc-icon"
        @click="showPlayControlDrawer"
        v-show="showDisc"
        :style="{ backgroundImage: `url(${discImageArr[discImageIndex]})` }"
      ></div>
    </transition>

    <van-popup v-model="playShow" position="top">
      <PlayControl
        :title="title"
        :duration="duration"
        :current-time="currentTime"
        :play-state="audioPlayState"
        :is-loop="needLoop"
        :anchor="anchor"
        @set-audio-currentTime="setAudioCurrentTime"
        @play-or-pause="playOrPause"
        @toggle-loop="needLoop = !needLoop"
        @go-article="goArticle"
      />
    </van-popup>
  </div>
</template>

<script>
import PlayControl from "@/components/PlayControl";
import { discImageArr } from "./utils/discImageArr";
// import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      year: "",
      type: "",
      date: 0,
      src: "",
      // 音频总时长
      duration: 0,
      // 当前媒体元素的播放市场
      currentTime: 0,
      // flag 标记唱片小元素是否显示
      showDisc: false,
      discImageArr,
      discImageIndex: 0,
      discTimer: null,
      // 自定义音乐控制组件的显示隐藏属性
      playShow: false,
      // 当前朗读文章标题
      title: "",
      // 当前文章的朗读者
      anchor: "",
      // 当前文章的路由路径
      articlePath: "",
      // 记录当前audio的播放暂停状态
      audioPlayState: false, // 默认没有播放
      // 记录当前audio是否循环播放
      needLoop: false, // 不循环
    };
  },
  computed: {
    // ...mapState(["title", "anchor"]),
  },
  methods: {
    // ...mapMutations(["setDuration"]),
    setYear(yearStr) {
      this.year = yearStr;
    },
    setType(typeStr) {
      this.type = typeStr;
    },
    setDate(dateStr) {
      this.date = dateStr;
    },
    setAudioSrc({ src, title, anchor, articlePath }) {
      // 避免重复的点击同一首歌不停的load(),做个判断当前歌与点击播放是否是同一首
      if (this.src == src) {
        this.playOrPause();
      } else {
        this.src = src;
        this.title = title;
        this.anchor = anchor;
        this.articlePath = articlePath;
        this.$nextTick(() => {
          this.$refs.audio.load();
          this.playMusic();
        });
      }
    },
    getAudioMetaSource() {
      this.duration = this.$refs.audio.duration;
      // console.log(this.duration);
      // this.setDuration(this.duration);
    },
    playMusic() {
      this.$refs.audio.play();
      this.showDisc = true;
      this.$nextTick(() => {
        this.discAnimation();
      });
    },
    audioTimeupdate() {
      this.currentTime = this.$refs.audio.currentTime;
    },
    showPlayControlDrawer() {
      this.playShow = true;
    },
    discAnimation() {
      this.discTimer = setInterval(() => {
        this.discImageIndex =
          (this.discImageIndex + 1) % this.discImageArr.length;
      }, 80);
    },
    setAudioCurrentTime(time) {
      this.$refs.audio.currentTime = time;
    },
    playOrPause() {
      if (this.audioPlayState) {
        this.$refs.audio.pause();
        clearInterval(this.discTimer);
      } else {
        this.$refs.audio.play();
        this.discAnimation();
      }
    },
    goArticle() {
      if (this.$route.fullPath != this.articlePath) {
        this.$router.push(this.articlePath);
      }
      this.playShow = false;
    },
  },
  components: {
    PlayControl,
  },
};
</script>

<style lang="scss">
.disc-icon {
  position: fixed;
  top: 80px;
  right: 0;
  width: 40px;
  height: 40px;
  z-index: 900;
  background-image: url("./assets/img/float_player/float_player_play_01.png");
  background-size: 100% 100%;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s linear;
}

.slide-enter-to,
.slide-leave {
  transform: translateX(0);
}

.tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 55px;
  background-color: #fff;

  .tab-bar-item {
    flex: 1;
    background-size: 40px 40px;
    background-repeat: no-repeat;
    background-position: center center;

    &.icon-home {
      background-image: url(./assets/img/tabbar/icon_home.png);
    }

    &.icon-discover {
      background-image: url(./assets/img/tabbar/icon_discover.png);
    }

    &.icon-serialize {
      background-image: url(./assets/img/tabbar/icon_serial.png);
    }

    &.icon-user {
      background-image: url(./assets/img/tabbar/icon_me.png);
    }

    &.router-link-active {
      &.icon-home {
        background-image: url(./assets/img/tabbar/icon_home_selected.png);
      }

      &.icon-discover {
        background-image: url(./assets/img/tabbar/icon_discover_selected.png);
      }

      &.icon-serialize {
        background-image: url(./assets/img/tabbar/icon_serial_selected.png);
      }

      &.icon-user {
        background-image: url(./assets/img/tabbar/icon_me_selected.png);
      }
    }
  }
}
</style>
