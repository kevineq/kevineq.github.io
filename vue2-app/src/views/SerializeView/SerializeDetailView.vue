<template>
  <div class="serialize-detail-view">
    <div class="title">
      <van-icon
        class="arrow"
        name="arrow-left"
        size="22"
        color="#999"
        @click="back"
      />
      <div class="text">{{ serializeTitle }}</div>
    </div>
    <div class="content">
      <EssayCard
        v-for="r in serializeDetailList"
        :key="r.id"
        :title="r.title"
        :subtitle="r.subtitle"
        :cover="r.cover"
        :category="r.category"
        :id="r.id"
        @select="selectedDateArticle"
      />
    </div>
  </div>
</template>

<script>
import { getSerialcontentData } from "@/utils/apis/articlecontent";
import EssayCard from "@/components/EssayCard.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      serializeDetailList: [],
      isloading: true,
      id: "",
    };
  },

  computed: {
    ...mapState(["serializeTitle"]),
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
      getSerialcontentData({
        axios: this.$axios,
        id: this.id,
      }).then(({ data }) => {
        // console.log(data);
        this.serializeDetailList = data.data;
      });
      this.$nextTick(() => {
        this.isloading = false;
      });
    },
  },
  components: {
    EssayCard,
  },
};
</script>

<style lang="scss" scoped>
.serialize-detail-view {
  position: fixed;
  top: 50px;
  width: 100vw;
  height: calc(100vh - 50px);
  overflow: auto;
  background-color: #fff;

  .title {
    position: fixed;
    top: 0;
    display: flex;
    width: 100%;
    height: 45px;
    align-items: center;
    background-color: #fff;

    .arrow {
      margin-left: 10px;
    }

    .text {
      margin-left: 10px;
    }
  }

  .content {
    padding: 0 15px;
  }
}
</style>

