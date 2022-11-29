<template>
  <div class="list-item" @click="goArticleDetail">
    <div class="img-wrap">
      <p class="label"><i class="icon-radio"></i> {{ volume }}</p>
      <img v-lazy="cover" />
      <div class="title-label-wrap">
        <p class="title-label">{{ title }}</p>
        <i class="icon-play"></i>
      </div>
    </div>
    <div class="tool-bar">
      <div class="left-bar">
        <img v-lazy="web_url" />
        {{ user_name }}
      </div>
      <div class="right-bar">
        <div class="like-box">
          <i
            class="icon-feeds_laud_default"
            :class="{ active: isLike }"
            @click.stop="like"
          ></i>
          <transition name="move">
            <span class="like" ref="like">{{ like_count }}</span>
          </transition>
        </div>
        <i class="icon-feeds_share"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    title: String,
    cover: String,
    volume: String,
    user_name: String,
    web_url: String,
    like_count: Number,
    category: Number,
    id: Number,
  },

  data() {
    return {
      isLike: false,
    };
  },

  methods: {
    ...mapMutations(["setCollectObj"]),
    goArticleDetail() {
      this.setCollectObj({
        title: this.title,
        subtitle: this.user_name,
        cover: this.cover,
      });
      // console.log(this.title, this.user_name, this.cover)
      this.$emit("select", this.category, this.id);
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
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  width: calc(100vw - 30px);
  margin-bottom: 20px;

  .img-wrap {
    position: relative;
    border-radius: 10px;
    width: 100%;
    overflow: hidden;

    .label {
      position: absolute;
      top: 15px;
      left: 15px;
      font-size: 12px;
      line-height: 12px;
      color: #fff;

      .icon-radio {
        display: inline-block;
        width: 48px;
        height: 12px;
        vertical-align: top;
        transform: translateY(1px);
        background-image: url(../assets/img/article/one_radio_icon.png);
        background-size: 48px;
        background-position: center center;
        background-repeat: no-repeat;
        margin-right: 5px;
      }
    }

    .title-label-wrap {
      position: absolute;
      left: 15px;
      right: 15px;
      bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;

      .title-label {
        flex: 1;
        margin-right: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .icon-play {
        flex: 0 0 32px;
        display: block;
        width: 32px;
        height: 32px;
        background-image: url(../assets/img/play/feeds_radio_play.png);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }

    img {
      width: 100%;
    }
  }
  .tool-bar {
    display: flex;
    justify-content: space-between;
    padding: 20px 5px;
    font-size: 12px;
    color: #999;
    align-items: center;

    .left-bar {
      line-height: 24px;

      img {
        display: inline-block;
        margin-right: 4px;
        border-radius: 999px;
        width: 24px;
        height: 24px;
        vertical-align: top;
      }
    }

    .right-bar {
      flex: 0 0 100px;
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
          top: 4px;
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
      margin-right: 3px;
      width: 20px;
      height: 20px;
      background-size: 20px 20px;
      background-position: center center;
      background-repeat: no-repeat;
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