<template>
  <div class="serialize-view">
    <SerializeCard
      v-for="b in serialcontentList"
      :key="b.id"
      :listItem="b"
      @select="selectedDateArticle"
    />
  </div>
</template>

<script>
import { debounce } from "lodash-es";
import SerializeCard from "@/components/SerializeCard.vue";
import { getYearSerialcontentList } from "@/utils/apis/articlecontent";

export default {
  data() {
    return {
      serialcontentList: [],
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
        path: "/serialize/serializeDetail",
        query: {
          id,
        },
      });
    },

    getData() {
      getYearSerialcontentList({
        axios: this.$axios,
        date: this.$route.path.slice(11),
      }).then(({ data }) => {
        // console.log(data);
        this.serialcontentList = data.data;
        this.$nextTick(() => {
          this.isloading = false;
        });
      });
    },
  },

  components: {
    SerializeCard,
  },
};
</script>

<style lang="scss" scoped>
.serialize-view {
  position: fixed;
  top: 45px;
  width: 100vw;
  height: calc(100vh - 100px);
  overflow: auto;
}
</style>