<template>
  <div class="share-view">
    <van-icon class="cross" name="cross" size="20px" @click="cross" />
    <div class="icon" v-for="i in 5" :key="i" @click="share"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: "http://192.168.41.45:8080/",
    };
  },

  methods: {
    cross() {
      this.$router.go(-1);
    },

    share() {
      this.$copyText(this.address);
      this.$toast({
        message: "已复制到剪切板",
        position: "bottom",
      });
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.share-view {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  z-index: 50;

  .cross {
    position: absolute;
    right: 20px;
    top: 20px;
    color: #999;
  }

  .icon {
    margin: 20px 0;
    width: 30px;
    height: 30px;
    background-size: cover;
  }

  .icon:nth-of-type(1) {
    background-image: url(@/assets/img/share/bubble_moment.png);
  }

  .icon:nth-of-type(2) {
    background-image: url(@/assets/img/share/bubble_wechat.png);
  }

  .icon:nth-of-type(3) {
    background-image: url(@/assets/img/share/bubble_qq.png);
  }

  .icon:nth-of-type(4) {
    background-image: url(@/assets/img/bubble_weibo.png);
  }

  .icon:nth-of-type(5) {
    background-image: url(@/assets/img/share/bubble_copy_link.png);
  }
}
</style>