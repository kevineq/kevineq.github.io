<template>
  <div class="reading-view">
    <SearchCard v-for="s in searchContentList" :key="s.content_id" :listItem="s" />
    <div class="null" v-if="show"></div>
    <van-loading v-if="isloading" class="loading" />
  </div>
</template>

<script>
import SearchCard from "@/components/SearchCard.vue";
import { getSearchList } from "@/utils/apis/articlecontent";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      searchContentList: [],
      show: false,
      keyword: "",
      isloading: true,
    };
  },

  computed: {
    word() {
      if (this.$route.path.slice(7) != "/author") {
        return;
      }
      return this.$route.query.keyword;
    },
  },

  watch: {
    word(val) {
      // console.log(val);
      if (!val || this.keyword == val) {
        return;
      }
      this.getData();
    },
  },

  activated() {
    // console.log("页面激活");
    let { category, keyword } = this.$route.query;
    this.setActive(parseInt(category));
    if (this.keyword == keyword) {
      return;
    }
    this.searchContentList = [];
    this.getData();
  },

  methods: {
    ...mapMutations(["setActive"]),
    getData(page = 0) {
      let { category, keyword } = this.$route.query;
      this.keyword = keyword;
      this.show = false;
      getSearchList({
        axios: this.$axios,
        category,
        keyword,
        page,
      }).then(({ data }) => {
        // console.log(data);
        if (data.data.list.length == 0) {
          this.show = true;
          this.$nextTick(() => {
            this.isloading = false;
          });
          return;
        }
        this.searchContentList = data.data.list;
        this.$nextTick(() => {
          this.isloading = false;
        });
      });
    },
  },

  components: {
    SearchCard,
  },
};
</script>

<style lang="scss" scoped>
.reading-view {
  position: fixed;
  top: 98px;
  width: 100vw;
  height: calc(100vh - 98px);
  overflow: auto;

  .null {
    width: 100%;
    height: 100%;
    background-size: 147px 187px;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url(@/assets/img/no_search_result.png);
  }

  .loading {
    width: 30px;
    height: 30px;
    margin: 0 auto;
    color: #000;
  }
}
</style>

