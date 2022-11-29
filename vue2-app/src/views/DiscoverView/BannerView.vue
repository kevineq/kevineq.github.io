<template>
  <div class="BannerCard">
    <BannerCard v-for="b in bannerContentList" :key="b.id" :listItem="b" />
    <div class="banner-text" v-show="bannerContentList.length">已加载完毕</div>
    <van-loading v-if="isloading" class="loading" />
  </div>
</template>

<script>
import { debounce } from "lodash-es";

import BannerCard from "@/components/BannerCard.vue";
import { getBannerList } from "@/utils/apis/articlecontent";

export default {
  data() {
    return {
      bannerContentList: [],
      isloading: true,
    };
  },

  created() {
    this.getData = debounce(this.getData);
  },
  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      getBannerList({
        axios: this.$axios,
      }).then(({ data }) => {
        // console.log(data);
        this.bannerContentList = data.data;
        this.$nextTick(() => {
          this.isloading = false;
        });
      });
    },
  },

  components: {
    BannerCard,
  },
};
</script>

<style lang="scss" scoped>
.BannerCard {
  position: fixed;
  top: 90px;
  width: 100vw;
  height: calc(100vh - 145px);
  overflow: auto;

  .banner-text {
    height: 30px;
    vertical-align: top;
    font-size: 14px;
    text-align: center;
    color: #999;
  }

  .loading {
    width: 30px;
    height: 30px;
    margin: 0 auto;
    color: #000;
  }
}
</style>

