<template>
  <div class="rank-view">
    <RankCard
      v-for="r in rankContentList"
      :key="r.id"
      :listItem="r"
      @select="selectedDateArticle"
      @selects="selectedDateArticles"
    />
    <van-loading v-if="isloading" class="loading" />
    <transition name="scroll-router">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { debounce } from "lodash-es";
import RankCard from "@/components/RankCard.vue";
import { getRankList } from "@/utils/apis/articlecontent";

export default {
  data() {
    return {
      rankContentList: [],
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
    selectedDateArticle(id) {
      this.$router.push({
        path: "/discover/rank/rankDetail",
        query: {
          id,
        },
      });
    },

    selectedDateArticles(category, id) {
      this.$router.push({
        path: "/articleDetail",
        query: {
          category,
          id,
        },
      });
    },

    getData() {
      getRankList({
        axios: this.$axios,
      }).then(({ data }) => {
        // console.log(data);
        this.rankContentList = data.data;
        this.$nextTick(() => {
          this.isloading = false;
        });
      });
    },
  },

  components: {
    RankCard,
  },
};
</script>

<style lang="scss" scoped>
.rank-view {
  position: fixed;
  top: 90px;
  width: 100vw;
  height: calc(100vh - 145px);
  overflow: auto;

  .scroll-router-enter,
  .scroll-router-leave-to {
    transform: translateX(100%);
  }

  .scroll-router-enter-active,
  .scroll-router-leave-active {
    transition: all 0.2s linear;
  }

  .scroll-router-enter-to,
  .scroll-router-leave {
    transform: translateX(0);
  }

  .loading {
    width: 30px;
    height: 30px;
    margin: 0 auto;
    color: #000;
  }
}
</style>

