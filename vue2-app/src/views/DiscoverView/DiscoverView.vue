<template>
  <div class="discover-view">
    <div class="nav-box">
      <van-nav-bar>
        <template #left>
          <van-icon name="wap-nav" size="20" color="#000" />
        </template>
        <template #title>
          <div class="search" @click="search">Search One</div>
        </template>
        <template #right>
          <van-icon name="plus" size="20" color="#000" />
        </template>
      </van-nav-bar>

      <div class="nav" ref="nav">
        <div
          class="item"
          ref="item"
          v-for="(s, i) in discoverTypes"
          :key="s"
          @click="toggleType(i)"
        >
          {{ s }}
        </div>
      </div>
    </div>
    <transition :name="transitionName">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { debounce } from "lodash-es";
import { discoverTypes, discoverNames } from "@/utils/discoverType";

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$nextTick(() => {
        vm.$refs.nav.scrollLeft = vm.scorll;
      });
    });
  },

  data() {
    return {
      discoverTypes,
      transitionName: "",
      preventIndex: 2,
      scorll: 0,
    };
  },

  created() {
    this.toggleType = debounce(this.toggleType);
  },

  mounted() {
    this.toggleType(this.preventIndex);
  },

  computed: {
    type() {
      if (this.$route.path.slice(0, 9) != "/discover") {
        return;
      }
      return this.$route.path.slice(10);
    },
  },

  watch: {
    type(val) {
      if (!val) {
        return;
      }
      this.$emit("set-type", val);
    },
  },

  methods: {
    search() {
      this.$router.push(`/search`);
    },

    toggleType(i) {
      // console.log(i);
      if (i > this.preventIndex) {
        this.transitionName = "scroll-router1";
      } else if (i < this.preventIndex) {
        this.transitionName = "scroll-router2";
      }
      this.preventIndex = i;
      let type = discoverNames[i];
      this.$refs.item.forEach((item, index) => {
        if (i == index) {
          item.style.fontSize = "18px";
          item.style.fontWeight = "700";
          item.style.color = "#000";
        } else {
          item.style.fontSize = "16px";
          item.style.fontWeight = "400";
          item.style.color = "#999";
        }
      });
      this.$router.push(`/discover/${type}`);
      this.$refs.nav.scrollLeft = 75 * (i - 2);
      this.scorll = this.$refs.nav.scrollLeft;
    },
  },
};
</script>

<style lang="scss" scoped>
.discover-view {
  position: fixed;
  top: 90px;
  width: 100vw;
  height: calc(100vh - 145px);
  overflow: auto;
  z-index: 50;

  .nav-box {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 90px;

    .search {
      padding: 5px 70px;
      border-radius: 999px;
      background-color: #eee;
      color: #999;
      font-size: 14px;
      background-size: 14px 14px;
      background-repeat: no-repeat;
      background-position: 10px center;
      background-image: url("@/assets/img/discover_icon_search.png");
    }

    .nav {
      display: flex;
      width: 100%;
      height: 44px;
      align-items: center;
      overflow: auto;

      .item {
        border-radius: 999px;
        padding: 0 21px;
        white-space: nowrap;
      }
    }

    .nav::-webkit-scrollbar {
      display: none;
    }
  }

  .scroll-router1-enter {
    transform: translateX(100%);
  }

  .scroll-router1-leave-to {
    transform: translateX(-100%);
  }

  .scroll-router1-enter-active,
  .scroll-router1-leave-active {
    transition: all 0.2s linear;
  }

  .scroll-router1-enter-to,
  .scroll-router1-leave {
    transform: translateX(0);
  }

  .scroll-router2-enter {
    transform: translateX(-100%);
  }

  .scroll-router2-leave-to {
    transform: translateX(100%);
  }

  .scroll-router2-enter-active,
  .scroll-router2-leave-active {
    transition: all 0.2s linear;
  }

  .scroll-router2-enter-to,
  .scroll-router2-leave {
    transform: translateX(0);
  }
}
</style>