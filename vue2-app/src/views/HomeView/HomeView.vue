<template>
  <div class="home-view" ref="homeView" @scroll.passive="scrollhandle">
    <HomeNavView :weather="weather" :dateObj="dateObj" :scorll="scorll" />

    <div class="content-list-wrapper">
      <HomeContentView
        v-for="c in contentList"
        :key="c.id"
        :category="c.category"
        :listItem="c"
        :likeCount="c.like_count"
        :keyArr="keyArr"
      />
    </div>
    <van-loading v-if="isloading" class="loading" />

    <transition name="scroll-router">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { debounce } from "lodash-es";
import { monthEnList } from "@/utils/dateTools";
import HomeNavView from "./HomeNavView.vue";
import HomeContentView from "./HomeContentView.vue";
import { getHomeData } from "@/utils/apis/articlecontent";

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      let keyArr = [];
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.slice(0, 2) == "hp") {
          keyArr.push(key.slice(3));
        }
      }
      vm.keyArr = keyArr;
      vm.$nextTick(() => {
        vm.$refs.homeView.scrollTop = vm.scorll;
      });
    });
  },

  name: "HomeView",
  data() {
    return {
      weather: {},
      contentList: [],
      scorll: 0,
      keyArr: [],
      isloading: true,
    };
  },

  computed: {
    date() {
      return this.$route.params.date;
    },

    dateObj() {
      let res = null;
      if (this.date) {
        let date = new Date();
        if (this.date != 0) {
          date = new Date(this.date);
        }
        let m = date.getMonth();
        let d = date.getDate();
        d = d >= 10 ? d : "0" + d;
        res = {
          year: date.getFullYear(),
          month: monthEnList[m],
          day: d,
        };
      }
      return res;
    },
  },

  created() {
    this.getData = debounce(this.getData);
  },
  mounted() {
    this.getData();
  },

  watch: {
    date(val) {
      // console.log(val);
      if (!val) {
        return;
      }
      this.$emit("set-date", val);
      this.getData();
    },
  },

  methods: {
    getData() {
      getHomeData({
        axios: this.$axios,
        date: this.date,
      }).then(({ data }) => {
        // console.log(data.data);
        this.contentList = data.data.content_list;
        this.weather = data.data.weather;
        this.$nextTick(() => {
          this.isloading = false;
        });
      });
    },

    scrollhandle() {
      this.scorll = this.$refs.homeView.scrollTop;
    },
  },
  components: {
    HomeNavView,
    HomeContentView,
  },
};
</script>

<style lang="scss" scoped>
.home-view {
  position: fixed;
  top: 50px;
  width: 100vw;
  height: calc(100vh - 105px);
  overflow: auto;
  z-index: 50;

  .content-list-wrapper {
    background-color: rgba(238, 238, 238, 0.5);
  }

  .scroll-router-enter,
  .scroll-router-leave-to {
    transform: translateY(-100%);
  }

  .scroll-router-enter-active,
  .scroll-router-leave-active {
    transition: all 0.2s linear;
  }

  .scroll-router-enter-to,
  .scroll-router-leave {
    transform: translateY(0);
  }

  .loading {
    width: 30px;
    height: 30px;
    margin: 0 auto;
    color: #000;
  }
}
</style>
