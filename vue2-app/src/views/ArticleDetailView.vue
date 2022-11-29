<template>
  <div class="detail-view" ref="article">
    <van-nav-bar :title="navTitle" fixed>
      <template #left>
        <van-icon name="arrow-left" size="20" color="#bbb" @click="back" />
      </template>
      <template #right>
        <van-icon class="favorite" :class="{ active: isCollect }" @click.stop="collect" />
      </template>
    </van-nav-bar>

    <div class="audio-banner" v-if="category == 8">
      <div class="play-wrap">
        <div class="soundwave">
          <SoundWave :playState="playState" />
        </div>
        <div class="play" :class="{ pause: playState }" @click="togglePlay" />
        <div class="soundwave">
          <SoundWave :playState="playState" />
        </div>
      </div>
    </div>

    <div class="music-banner" v-if="category == 4">
      <div class="music-bg">
        <img v-lazy="bgImage" alt="" />
      </div>
      <div class="music-cover">
        <img v-lazy="cover" alt="" />
      </div>
      <div class="music-disk" :class="{ disk: playState }">
        <img v-lazy="disk" alt="" />
      </div>
      <div class="music-play" :class="{ play: playState }" @click="play"></div>
      <div class="music-info">{{ info }}</div>
    </div>

    <div class="detail-wrap">
      <h2 class="aticle-title">{{ title }}</h2>
      <div class="info">
        <p class="author">{{ author }}</p>
        <div class="volume" v-if="volume">{{ volume }}</div>
      </div>
      <div class="brief" v-if="brief">{{ brief }}</div>
      <div class="simple" v-if="simple">{{ simple }}</div>
      <div class="audio-box" v-if="audio && category != 8" @click="play">
        <van-icon name="volume-o" />
        <div class="audio-anchor">有声读物 | {{ anchor }}</div>
        <div class="audio-duration">{{ durationStr }}</div>
      </div>
      <div class="html-content" v-html="content"></div>
      <p class="editor">{{ editor }}</p>
      <p class="copyright">{{ copyright }}</p>
      <div class="author-list" v-if="authorList.length">
        <span class="detail-label">{{
            this.category == 8 ? "主播" : "作者"
        }}</span>
        <div v-for="a in authorList" class="author-card" :key="a.user_id">
          <img :src="a.web_url" />
          <div class="user-desc">
            <h3 class="user-name">{{ a.user_name }} {{ a.wb_name }}</h3>
            <p>{{ a.summary }}</p>
          </div>
          <span class="follow-btn">关注</span>
        </div>
      </div>
      <div class="rating-list" ref="rating" v-if="ratingList.length">
        <span class="detail-label">评论列表</span>
        <ul>
          <li class="rating-list-item" v-for="(r, i) in ratingList" :key="i">
            <div class="avatar">
              <img :src="r.user.web_url" />
            </div>
            <div class="rating-desc">
              <h3 class="user-name">{{ r.user.user_name }}</h3>
              <span class="time">{{
                  r.input_date
                    .toLocaleString()
                    .split(" ")[0]
                    .split("-")
                    .join(".") +
                  " " +
                  r.input_date.toLocaleString().split(" ")[1].slice(0, -3)
              }}</span>
              <div class="quote-box" v-if="r.quote">
                <div class="van-multi-ellipsis--l2 quote">
                  {{ r.quote }}
                </div>
              </div>
              <p class="rating-content">{{ r.content }}</p>
              <div class="btn-bar">
                <div class="comment"></div>
                <div class="good"></div>
                <div class="praisenum">{{ r.praisenum }}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <audio v-if="audio" :src="audio" @canplay="getAudioDuration" />
    </div>
    <div class="comment-user">
      <div class="com" @click="showPopup">写一个评论...</div>
      <div class="icon1">
        <div class="icon-feeds_laud_default" :class="{ active: isLike }" @click.stop="like"></div>
        <div ref="like">{{ praisenum }}</div>
      </div>
      <div class="icon2" @click="ratingBtn">
        <div class="commento"></div>
        <div ref="commento">{{ commentnum }}</div>
      </div>
      <div class="icon-feeds_share" @click="share"></div>
    </div>
    <van-popup v-model="show" position="bottom" class="text-box">
      <textarea placeholder="在这里写下你想说的..." v-model="value"></textarea>
      <div class="text-info">
        <div class="text-count">{{ textCount }}</div>
        <div class="sub" @click="submit" :style="{ backgroundColor: bgColor }">
          发送
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  getArticleDetail,
  getArticleRatings,
  titleTypes,
} from "@/utils/apis/articlecontent";
// import { mapState, mapMutations } from "vuex";
import SoundWave from "@/components/SoundWave.vue";
import { mapState } from "vuex";

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      let keyArr = [];
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.slice(0, 7) == "article") {
          keyArr.push(key.slice(8));
        } else if (key.slice(0, 5) == "music") {
          keyArr.push(key.slice(6));
        } else if (key.slice(0, 5) == "movie") {
          keyArr.push(key.slice(6));
        } else if (key.slice(0, 5) == "radio") {
          keyArr.push(key.slice(6));
        }
      }
      vm.keyArr = keyArr;
    });
  },

  props: {
    playState: Boolean,
  },
  data() {
    return {
      // 文章标题
      title: "",
      // 作者
      author: "",
      // 音频地址
      audio: "",
      // 朗读者
      anchor: "",
      // 内容主题
      content: "",
      // 责任编辑
      editor: "",
      // 文章引用
      copyright: "",
      // 作者列表
      authorList: [],
      // 评论列表
      ratingList: [],
      // 当前文章的id
      contentId: "",
      // 当前文章的category
      category: "",
      // 音频的总时长
      duration: 0,
      // 第几期
      volume: 0,
      // 点赞数
      praisenum: 0,
      // 评论数
      commentnum: 0,
      // 问答
      brief: "",
      // 问答
      simple: "",
      // 音乐背景
      bgImage: "",
      // 音乐唱片
      disk: "",
      // 音乐图片
      cover: "",
      // 音乐信息
      info: "",
      // 音乐路径
      music: "",
      // 滚动条
      scrollTop: 0,
      // 弹出层
      show: false,
      // 文字数量
      // textCount: 500,
      // 文字
      value: "",
      // 喜欢
      isLike: false,
      // 收藏
      isCollect: false,
      // 收藏key
      keyArr: [],
    };
  },
  computed: {
    ...mapState(["collectObj"]),
    bgColor() {
      return this.value.length > 0 ? "#fff" : "#ccc";
    },

    textCount() {
      return 500 - this.value.length;
    },

    navTitle() {
      return titleTypes[this.$route.query.category];
    },
    durationStr() {
      let m = Math.floor(this.duration / 60);
      let s = Math.floor(this.duration % 60);
      m = m >= 10 ? m : "0" + m;
      s = s >= 10 ? s : "0" + s;
      return m + ":" + s;
    },
  },
  methods: {
    share() {
      this.$router.push('/share')
    },

    collectYesOrNo() {
      this.isCollect = false;
      // console.log(this.keyArr)
      this.$nextTick(() => {
        let index = this.keyArr.indexOf(this.category + "-" + this.contentId);
        if (index > -1) {
          this.isCollect = true;
        }
      });
    },

    collect() {
      if (this.isCollect == false) {
        let key = "";
        if (this.category == 4) {
          key = "music-" + this.category + "-" + this.contentId;
        } else if (this.category == 5) {
          key = "movie-" + this.category + "-" + this.contentId;
        } else if (this.category == 8) {
          key = "radio-" + this.category + "-" + this.contentId;
        } else {
          key = "article-" + this.category + "-" + this.contentId;
        }
        let value = {
          id: this.contentId,
          category: this.category,
          title: this.collectObj.title,
          subtitle: this.collectObj.subtitle,
          cover: this.collectObj.cover,
        };
        value = JSON.stringify(value);
        localStorage[key] = value;
        this.isCollect = true;
        this.$toast({
          message: "已收藏至个人中心",
          position: "bottom",
        });
      } else {
        let key = "";
        if (this.category == 4) {
          key = "music-" + this.category + "-" + this.contentId;
        } else if (this.category == 5) {
          key = "movie-" + this.category + "-" + this.contentId;
        } else if (this.category == 8) {
          key = "radio-" + this.category + "-" + this.contentId;
        } else {
          key = "article-" + this.category + "-" + this.contentId;
        }
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

    submit() {
      if (this.value) {
        this.ratingList.unshift({
          user: {
            web_url: "../assets/img/user.jpg",
            user_name: "kevin",
          },
          input_date: "2022-11-08 " + new Date().toLocaleString().split(" ")[1],
          content: this.value,
          praisenum: 0,
        });
        this.$toast({
          message: "发布成功",
          position: "bottom",
        });
        this.show = false;
        this.value = "";
        this.$refs.article.scrollTop = this.$refs.rating.offsetTop;
        this.$refs.commento.textContent++;
      } else {
        this.$toast({
          message: "无法发送空内容",
          position: "bottom",
        });
      }
    },

    showPopup() {
      this.show = true;
      // console.log(this.value.length);
    },

    ratingBtn() {
      if (this.$refs.article.scrollTop + 1 < this.$refs.rating.offsetTop) {
        this.scrollTop = this.$refs.article.scrollTop;
        this.$refs.article.scrollTop = this.$refs.rating.offsetTop;
      } else {
        this.$refs.article.scrollTop = this.scrollTop;
      }
    },

    getAudioDuration(e) {
      this.duration = e.target.duration;
    },
    // ...mapMutations(["setTitleAndAnchor"]),
    back() {
      this.$router.go(-1);
    },
    play() {
      // console.log("播放");
      let src = "";
      if (this.category == 4) {
        src = this.music;
      } else {
        src = this.audio;
      }
      this.$emit("set-audio-src-and-play", {
        src,
        title: this.title,
        anchor: this.anchor,
        articlePath: this.$route.fullPath,
      });
    },
    // 将文章内容存入sessionStorage
    saveArticleDataUseSessionStorage(category, id) {
      // key id-category : value 当前页面需要的数据
      let key = category + "-" + id;
      let value = {
        title: this.title,
        // 作者
        author: this.author,
        // 音频地址
        audio: this.audio,
        // 朗读者
        anchor: this.anchor,
        // 内容主题
        content: this.content,
        // 责任编辑
        editor: this.editor,
        // 文章引用
        copyright: this.copyright,
        // 作者列表
        authorList: this.authorList,
        // 第几期
        volume: this.volume,
        // 点赞数
        praisenum: this.praisenum,
        // 评论数
        commentnum: this.commentnum,
        // 问答
        brief: this.brief,
        // 问答
        simple: this.simple,
        // 音乐背景
        bgImage: this.bgImage,
        // 音乐唱片
        disk: this.disk,
        // 音乐图片
        cover: this.cover,
        // 音乐信息
        info: this.info,
        // 音乐路径
        music: this.music,
      };
      value = JSON.stringify(value);
      sessionStorage[key] = value;
    },
    // 将文章相关评论存入sessionStorage
    saveArticleRatingsUseSessionStorage(category, id) {
      // key rating-id-category : value 当前页面需要的评论数据
      let key = "rating-" + category + "-" + id;
      let value = this.ratingList;
      value = JSON.stringify(value);
      sessionStorage[key] = value;
    },
    getArticleDataAndRatingsData() {
      let { category, id } = this.$route.query;
      this.category = category;
      this.contentId = id;
      let articleData = sessionStorage[category + "-" + id];
      let ratingListData = sessionStorage["rating-" + category + "-" + id];
      if (articleData && ratingListData) {
        // console.log("本地");
        articleData = JSON.parse(articleData);
        this.title = articleData.title;
        this.author = articleData.author;
        this.audio = articleData.audio;
        this.anchor = articleData.anchor;
        // this.setTitleAndAnchor({
        //   title: this.title,
        //   anchor: this.anchor,
        // });
        this.content = articleData.content;
        this.editor = articleData.editor;
        this.copyright = articleData.copyright;
        this.authorList = articleData.authorList;
        this.volume = articleData.volume;
        this.praisenum = articleData.praisenum;
        this.commentnum = articleData.commentnum;

        this.brief = articleData.brief;
        this.simple = articleData.simple;
        this.bgImage = articleData.bgImage;
        this.disk = articleData.disk;
        this.cover = articleData.cover;
        this.info = articleData.info;
        this.music = articleData.music;

        ratingListData = JSON.parse(ratingListData);
        this.ratingList = ratingListData;
        this.$nextTick(() => {
          if (this.category == 8 && this.audio) {
            this.play();
          }
        });
      } else {
        // console.log("网络");
        getArticleDetail({
          axios: this.$axios,
          id,
          category,
        }).then(({ data }) => {
          // console.log(data.data);
          let res = data.data;
          this.title = res.json_content.title;
          this.author = res.json_content.simple_author[0];
          this.audio = res.audio;
          this.anchor = res.anchor;
          // this.setTitleAndAnchor({
          //   title: this.title,
          //   anchor: this.anchor,
          // });
          this.content = res.json_content.content;
          this.editor = res.json_content.editor;
          this.copyright = res.json_content.copyright;
          this.authorList = res.author_list;
          this.volume = res.json_content.simple_author[1];
          this.praisenum = res.praisenum;
          this.commentnum = res.commentnum;

          this.brief = res.json_content.question_brief;
          this.simple = res.json_content.simple_answerer;
          this.bgImage = res.json_content.music_header?.bg;
          this.disk = res.json_content.music_header?.disk;
          this.cover = res.json_content.music_header?.cover;
          this.info = res.json_content.music_header?.info;
          this.music = res.json_content.audio_url;

          this.saveArticleDataUseSessionStorage(category, id);
          this.$nextTick(() => {
            if (this.category == 8 && this.audio) {
              this.play();
            }
          });
        });

        getArticleRatings({
          axios: this.$axios,
          category,
          id,
        }).then(({ data }) => {
          this.ratingList = data.data.data;
          this.saveArticleRatingsUseSessionStorage(category, id);
        });
      }
    },
    togglePlay() {
      this.$emit("play-or-pause");
    },
  },
  activated() {
    // console.log("页面激活");
    this.collectYesOrNo();
    let { category, id } = this.$route.query;
    if (this.category == category && this.contentId == id) {
      return;
    }
    this.getArticleDataAndRatingsData();
  },
  components: {
    SoundWave,
  },
};
</script>

<style lang="scss" scoped>
.detail-view {
  position: fixed;
  top: 46px;
  width: 100vw;
  height: calc(100vh - 110px);
  overflow: auto;
  z-index: 50;
  background-color: #fff;

  .favorite {
    width: 20px;
    height: 20px;
    background-image: url(@/assets/img/article/favourite_gray.png);
    background-size: cover;

    &.active {
      background-image: url(../assets/img/article/stow_selected.png);
    }
  }

  .audio-banner {
    position: relative;
    width: 100vw;
    aspect-ratio: 1125/600;
    background-image: url(@/assets/img/banner_fm_1125_600_2.jpg);
    background-size: cover;

    .play-wrap {
      position: absolute;
      left: 30px;
      bottom: 30px;
      right: 30px;
      display: flex;
      justify-content: space-between;
      height: 32px;

      .soundwave {
        flex: 1;
      }

      .play {
        margin: 0 30px;
        width: 32px;
        height: 32px;
        background-image: url(@/assets/img/play/feeds_radio_play.png);
        background-size: cover;

        &.pause {
          background-image: url(@/assets/img/play/feeds_radio_pause.png);
        }
      }
    }
  }

  .music-banner {
    position: relative;
    width: 100%;

    .music-bg {
      width: 100%;
      height: 250px;
      overflow: hidden;

      img {
        width: 100%;
        display: block;
      }
    }

    .music-cover {
      position: absolute;
      top: 80px;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 120px;
      height: 120px;
      z-index: 1;

      img {
        width: 100%;
        display: block;
      }
    }

    .music-disk {
      position: absolute;
      top: 80px;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 120px;
      height: 120px;
      transition: all 0.2s linear;

      &.disk {
        transform: translateX(25px);
      }

      img {
        width: 100%;
        display: block;
      }
    }

    .music-play {
      position: absolute;
      top: 120px;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 40px;
      height: 40px;
      border-radius: 999px;
      background-color: rgba(0, 0, 0, 0.7);
      background-size: 18px 18px;
      background-repeat: no-repeat;
      background-position: center center;
      background-image: url(@/assets/img/player_play_night.png);
      z-index: 50;

      &.play {
        background-image: url(@/assets/img/player_pause_night.png);
      }
    }

    .music-info {
      width: 100%;
      position: absolute;
      bottom: 20px;
      text-align: center;
      color: #ccc;
      font-size: 12px;
    }
  }

  .detail-wrap {
    padding: 0 15px;

    .aticle-title {
      line-height: 40px;
      margin: 30px 0;
      font-size: 24px;
      font-weight: bold;
    }

    .info {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #777;
    }

    .brief {
      padding: 20px 0 30px 0;
      border-bottom: 1px solid #ddd;
    }

    .simple {
      font-size: 13px;
      color: #777;
      margin-top: 30px;
    }

    .audio-box {
      margin-top: 30px;
      border: 1px solid #000;
      border-radius: 5px;
      padding: 10px;
      display: flex;

      .audio-anchor {
        margin-left: 5px;
      }

      .audio-duration {
        margin-left: auto;
      }
    }

    .html-content {
      margin-top: 30px;
    }

    .editor,
    .copyright {
      font-size: 13px;
      color: #777;
    }

    .copyright {
      margin-top: 10px;
    }

    .author-list,
    .rating-list {
      margin-top: 35px;
    }

    .author-card {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 999px;
      }

      .user-desc {
        flex: 1;
        margin-left: 10px;

        .user-name {
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          color: black;
        }

        p {
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          color: #777;
        }
      }

      .follow-btn {
        border: 1px solid #777;
        border-radius: 3px;
        padding: 7px 10px;
        font-size: 14px;
        color: #777;
      }
    }

    .detail-label {
      display: block;
      border-bottom: 3px solid black;
      padding-bottom: 10px;
      font-size: 16px;
      width: 68px;
    }

    .rating-list-item {
      display: flex;
      border-bottom: 1px solid #ccc;
      padding: 15px 0;

      .avatar {
        flex: 0 0 20px;

        img {
          border-radius: 999px;
          width: 20px;
          height: 20px;
        }
      }

      .rating-desc {
        position: relative;
        flex: 1;

        .user-name {
          height: 20px;
          line-height: 20px;
          margin-left: 10px;
          font-size: 14px;
          color: #777;
        }

        .time {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 12px;
          color: #777;
        }

        .quote-box {
          padding: 10px;
          border: 1px solid #ccc;
          margin-top: 15px;

          .quote {
            font-size: 14px;
            color: #555;
            line-height: 22px;
          }
        }

        .rating-content {
          margin-top: 15px;
          font-size: 14px;
          line-height: 24px;
          color: #555;
        }

        .btn-bar {
          margin-top: 15px;
          display: flex;
          justify-content: flex-end;
          padding-right: 30px;
          font-size: 12px;
          color: #777;
          align-items: center;

          .comment {
            margin-right: 20px;
            width: 18px;
            height: 18px;
            background-size: 18px 18px;
            background-image: url(@/assets/img/bottom_comment.png);
          }

          .good {
            margin-right: 5px;
            width: 18px;
            height: 18px;
            background-size: 18px 18px;
            background-image: url(@/assets/img/comment_laud.png);
          }

          .praisenum {
            line-height: 16px;
            font-size: 14px;
          }
        }
      }
    }
  }

  .comment-user {
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;
    background-color: #fff;
    padding: 0 15px;
    box-shadow: 0px -4px 10px #eee;
    font-size: 12px;
    color: #999;

    .com {
      width: 120px;
      border: 1px solid #999;
      padding: 6px 10px;
      border-radius: 5px;
      font-size: 14px;
      color: #999;
      margin-right: auto;
    }

    .icon1 {
      display: flex;
      align-items: center;

      .icon-feeds_laud_default {
        margin-right: 5px;
        width: 20px;
        height: 20px;
        background-size: 20px 20px;
        background-image: url(@/assets/img/article/bottom_laud_default.png);

        &.active {
          background-image: url(@/assets/img/article/discover_laud_selected.png);
        }
      }
    }

    .icon2 {
      display: flex;
      align-items: center;
      margin: 0 20px;

      .commento {
        margin-right: 5px;
        width: 20px;
        height: 20px;
        background-size: 20px 20px;
        background-image: url(@/assets/img/bottom_comment.png);
      }
    }

    .icon-feeds_share {
      width: 20px;
      height: 20px;
      background-size: 20px 20px;
      background-image: url(@/assets/img/share_image.png);
    }
  }

  .text-box {
    padding: 20px;

    textarea {
      width: 100%;
      height: 150px;
      border: none;
      padding: 0;
      overflow: auto;
    }

    textarea::-webkit-input-placeholder {
      color: #999;
      font-size: 14px;
    }

    .text-info {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .text-count {
        color: #999;
      }

      .sub {
        font-size: 12px;
        padding: 8px 12px;
        border: 1px solid #999;
        color: #333;
      }
    }
  }
}
</style>
