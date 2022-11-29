<template>
  <div class="article-container" @click="goArticleDetail">
    <p class="type">- {{ categoryName }} -</p>
    <template v-if="category != 8">
      <h3 class="title">{{ listItem.title }}</h3>
      <p class="sub-title">
        <span v-if="category == 1">文 / </span>
        {{ listItem.author.user_name }}
      </p>
    </template>
    <p class="forward">{{ listItem.forward }}</p>
    <div class="img-wrap">
      <p class="label" v-if="category == 8">
        <i class="icon-radio"></i> {{ listItem.volume }}
      </p>
      <img v-lazy="listItem.img_url" />
      <div class="title-label-wrap" v-if="category == 8">
        <p class="title-label">{{ listItem.title }}</p>
        <i class="icon-play"></i>
      </div>
    </div>
    <div class="tool-bar">
      <div class="left-bar">
        <template v-if="category == 8">
          <img v-lazy="listItem.author.web_url" />
          {{ listItem.author.user_name }}
        </template>
      </div>
      <div class="right-bar">
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
import { titleTypes } from "@/utils/apis/articlecontent";
import { mapMutations } from "vuex";
export default {
  props: {
    listItem: Object,
    category: String,
  },

  data() {
    return {
      isLike: false,
    };
  },
  computed: {
    categoryName() {
      return titleTypes[this.category];
    },
  },
  methods: {
    ...mapMutations(["setCollectObj"]),
    goArticleDetail() {
      this.setCollectObj({
        title: this.listItem.title,
        subtitle: this.listItem.author.user_name,
        cover: this.listItem.img_url,
      });
      this.$emit("select", this.listItem.category, this.listItem.item_id);
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
.article-container {
  margin-top: 10px;
  padding: 12px;
  width: 100vw;
  background-color: #fff;

  .type {
    margin-bottom: 25px;
    text-align: center;
    color: #999;
  }

  .title {
    font-size: 20px;
    font-weight: 600;
  }

  .sub-title {
    margin-top: 15px;
    font-size: 14px;
    color: #999;
  }

  .forward {
    margin-top: 20px;
    margin-bottom: 10px;
    word-break: break-all;
    font-size: 14px;
    color: #777;
    line-height: 30px;
  }

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
    margin: 15px 5px 5px 5px;
    font-size: 12px;
    color: #999;
    height: 30px;
    align-items: center;

    .left-bar {
      line-height: 30px;

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
      align-items: center;

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
        background-image: url(../assets/img/article/discover_laud_selected.png);
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