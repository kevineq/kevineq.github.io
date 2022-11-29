<template>
    <div class="play-control">
      <h3 class="play-title">{{ title }}</h3>
      <input
        class="input"
        type="range"
        min="0"
        max="100"
        ref="slider"
        v-model="progress"
      />
      <div class="time-wrap">
        <span>{{ currentTimeStr }}</span>
        <span>{{ durationStr }}</span>
      </div>
      <p class="anchor-name">{{ anchor }}</p>
      <div class="control-bar">
        <div class="prev"></div>
        <div
          class="play"
          :class="{ pause: playState }"
          @click="playOrPause"
        ></div>
        <div class="next"></div>
      </div>
      <div class="bottom-bar">
        <div class="loop-btn" :class="{ loop: isLoop }" @click="toggleLoop"></div>
        <div class="logo"><i></i> 来自一个音乐</div>
        <div class="func-bar">
          <div class="collect"></div>
          <div class="go-article" @click="goArticle"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  // import { mapState } from "vuex";
  
  export default {
    name: "PlayControl",
    props: {
      title: String,
      currentTime: Number,
      duration: Number,
      playState: Boolean,
      isLoop: Boolean,
      anchor: String,
    },
    methods: {
      playOrPause() {
        this.$emit("play-or-pause");
      },
      toggleLoop() {
        this.$emit("toggle-loop");
      },
      goArticle() {
        this.$emit("go-article");
      },
    },
    computed: {
      // ...mapState(["duration", "title", "anchor"]),
      currentTimeStr() {
        if (!this.currentTime) {
          return "--:--";
        }
        let s = Math.floor(this.currentTime % 60);
        let m = Math.floor(this.currentTime / 60);
        m = m >= 10 ? m : "0" + m;
        s = s >= 10 ? s : "0" + s;
        return m + ":" + s;
      },
      durationStr() {
        if (!this.duration) {
          return "--:--";
        }
        let s = Math.floor(this.duration % 60);
        let m = Math.floor(this.duration / 60);
        m = m >= 10 ? m : "0" + m;
        s = s >= 10 ? s : "0" + s;
        return m + ":" + s;
      },
      progress: {
        get() {
          if (this.duration && this.currentTime) {
            let value = Math.ceil((this.currentTime * 100) / this.duration);
            // console.log(value);
            return value;
          }
          return 1;
        },
        set(value) {
          // console.log(value);
          let currentTime = Math.ceil((value * this.duration) / 100);
          this.$emit("set-audio-currentTime", currentTime);
        },
      },
    },
  };
  </script>
  
  <style lang="scss">
  .play-control {
    padding: 20px;
  
    .play-title {
      margin-bottom: 10px;
      text-align: center;
      color: #777;
    }
  
    .input {
      margin: 0;
      width: 100%;
      height: 5px;
    }
  
    .time-wrap {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #777;
    }
  
    .anchor-name {
      transform: translateY(-50%);
      text-align: center;
      font-size: 12px;
      color: #777;
    }
  
    .control-bar {
      margin-top: 26px;
      display: flex;
      justify-content: space-between;
      padding: 0 26vw;
  
      .prev,
      .play,
      .next {
        width: 44px;
        height: 44px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
  
      .prev {
        background-image: url("@/assets/img/play/last_disable.png");
      }
  
      .play {
        background-image: url("@/assets/img/play/player_play.png");
        &.pause {
          background-image: url("@/assets/img/play/player_pause.png");
        }
      }
  
      .next {
        background-image: url("@/assets/img/play/next_disable.png");
      }
    }
  
    .bottom-bar {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
  
      .func-bar {
        display: flex;
      }
  
      .loop-btn,
      .collect,
      .go-article {
        width: 22px;
        height: 22px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
  
      .logo {
        text-align: center;
        font-size: 12px;
        color: #999;
  
        i {
          vertical-align: top;
          display: inline-block;
          width: 12px;
          height: 12px;
          background-size: cover;
          background-image: url("@/assets/img/one_icon.png");
        }
      }
  
      .loop-btn {
        margin-right: 62px;
        background-image: url("@/assets/img/play/player_all_cycle.png");
        &.loop {
          background-image: url("@/assets/img/play/player_single_cycle.png");
        }
      }
  
      .collect {
        margin-right: 40px;
        background-image: url("@/assets/img/play/music_collection_disable.png");
      }
  
      .go-article {
        background-image: url("@/assets/img/play/detail_content.png");
      }
    }
  }
  </style>
  