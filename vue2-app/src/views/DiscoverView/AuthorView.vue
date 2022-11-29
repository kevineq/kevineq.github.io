<template>
  <div class="author-view">
    <div class="hot" v-if="AuthorContentList.length" AuthorContentList>
      热门作者
    </div>
    <AuthorCard
      v-for="a in AuthorContentList"
      :key="a.user_id"
      :listItem="a"
      :keyArr="keyArr"
    />
    <van-loading v-if="isloading" class="loading" />
  </div>
</template>

<script>
import { debounce } from "lodash-es";
import AuthorCard from "@/components/AuthorCard.vue";
import { getAuthorList } from "@/utils/apis/articlecontent";

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      let keyArr = [];
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.slice(0, 6) == "follow") {
          keyArr.push(key.slice(7));
        }
      }
      vm.keyArr = keyArr;
    });
  },

  data() {
    return {
      AuthorContentList: [],
      isloading: true,
      keyArr: [],
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
      getAuthorList({
        axios: this.$axios,
      }).then(({ data }) => {
        // console.log(data);
        this.AuthorContentList = data.data;
        this.$nextTick(() => {
          this.isloading = false;
        });
      });
    },
  },

  components: {
    AuthorCard,
  },
};
</script>

<style lang="scss" scoped>
.author-view {
  position: fixed;
  top: 90px;
  width: 100vw;
  height: calc(100vh - 145px);
  overflow: auto;

  .hot {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    padding: 0 15px;
  }

  .loading {
    width: 30px;
    height: 30px;
    margin: 0 auto;
    color: #000;
  }
}
</style>

