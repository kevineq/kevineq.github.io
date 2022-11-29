<template>
  <div class="diary-view">
    <DiaryCard v-for="d in diaryContentList" :key="d.id" :listItem="d" />
    <van-loading v-if="isloading" class="loading" />
  </div>
</template>

<script>
import { debounce } from "lodash-es";

import DiaryCard from "@/components/DiaryCard.vue";
import { getDiaryList } from "@/utils/apis/articlecontent";

export default {
  data() {
    return {
      diaryContentList: [],
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
      getDiaryList({
        axios: this.$axios,
        id: 0,
      }).then(({ data }) => {
        // console.log(data);
        this.diaryContentList = data.data.list;
        this.$nextTick(() => {
          this.isloading = false;
        });
      });
    },
  },

  components: {
    DiaryCard,
  },
};
</script>

<style lang="scss" scoped>
.diary-view {
  width: 100vw;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 0 15px;
  column-count: 2;

  .loading {
    width: 30px;
    height: 30px;
    color: #000;
  }
}
</style>

