<template>
  <div class="rank-detail-view">
    <div class="title">
      <van-icon name="arrow-left" size="22" color="#999" @click="back" />
      <div class="text">{{ rankTitle }}</div>
    </div>
    <EssayCard
      v-for="r in rankDetailList"
      :key="r.id"
      :title="r.title"
      :subtitle="r.subtitle"
      :cover="r.cover"
      :category="r.category"
      :id="r.id"
      @select="selectedDateArticle"
    />
    <van-loading v-if="isloading" class="loading" />
  </div>
</template>

<script>
import { getRankDetailList } from "@/utils/apis/articlecontent";
import EssayCard from "@/components/EssayCard.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      rankDetailList: [],
      isloading: true,
      id: "",
    };
  },

  computed: {
    ...mapState(["rankTitle"]),
  },

  activated() {
    // console.log("页面激活");
    let id = this.$route.query.id;
    if (this.id == id) {
      return;
    }
    this.getData();
  },

  methods: {
    selectedDateArticle(category, id) {
      this.$router.push({
        path: "/articleDetail",
        query: {
          category,
          id,
        },
      });
    },

    back() {
      this.$router.go(-1);
    },
    getData() {
      this.id = this.$route.query.id;
      getRankDetailList({
        axios: this.$axios,
        id: this.id,
      }).then(({ data }) => {
        // console.log(data);
        this.rankDetailList = data.data;
        this.$nextTick(() => {
          this.isloading = false;
        });
      });
    },
  },
  components: {
    EssayCard,
  },
};
</script>

<style lang="scss" scoped>
.rank-detail-view {
  position: fixed;
  top: 45px;
  width: 100vw;
  height: calc(100vh - 45px);
  overflow: auto;
  background-color: #fff;
  padding: 0 15px;

  .title {
    width: 100%;
    position: fixed;
    top: 0;
    display: flex;
    height: 45px;
    align-items: center;
    background-color: #fff;

    .text {
      margin-left: 10px;
    }
  }

  .loading {
    width: 30px;
    height: 30px;
    margin: 0 auto;
    color: #000;
  }
}
</style>