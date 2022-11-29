<template>
  <div class="serialize-view">
    <div class="nav-box">
      <div class="nav">
        <div
          class="item"
          ref="item"
          v-for="(s, i) in serializeTypes"
          :key="s"
          @click="toggleYear(s, i)"
        >
          {{ s }}
        </div>
      </div>
      <div class="search" @click="search"></div>
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
import { serializeTypes } from "@/utils/discoverType";

export default {
  data() {
    return {
      serializeTypes,
      transitionName: "",
      preventIndex: 0,
    };
  },

  created() {
    this.toggleYear = debounce(this.toggleYear);
  },
  mounted() {
    this.toggleYear(2022, 0);
  },

  computed: {
    year() {
      if (this.$route.path.slice(0, 10) != "/serialize") {
        return;
      }
      return this.$route.path.slice(11);
    },
  },

  watch: {
    year(val) {
      // console.log(val);
      if (!val) {
        return;
      }
      this.$emit("set-year", val);
    },
  },

  methods: {
    search() {
      this.$router.push(`/search`);
    },

    toggleYear(s, i) {
      // console.log(i);
      if (i > this.preventIndex) {
        this.transitionName = "scroll-router1";
      } else if (i < this.preventIndex) {
        this.transitionName = "scroll-router2";
      }
      this.preventIndex = i;
      this.$refs.item.forEach((item, index) => {
        if (i == index) {
          item.style.backgroundColor = "#363636";
          item.style.color = "#eee";
        } else {
          item.style.backgroundColor = "#f6f6f6";
          item.style.color = "#666";
        }
      });
      this.$router.push(`/serialize/${s}`);
      this.$nextTick(() => {
        this.transitionName = "scroll-router3";
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.serialize-view {
  position: fixed;
  top: 50px;
  width: 100vw;
  height: calc(100vh - 105px);
  z-index: 50;
  overflow: auto;

  .nav-box {
    display: flex;
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;

    .nav {
      width: calc(100% - 50px);
      height: 50px;
      display: flex;
      align-items: center;
      overflow: auto;

      .item {
        padding: 5px 10px;
        border-radius: 999px;
        margin: 0 8px;
      }

      .item:last-of-type {
        margin-right: 0;
      }
    }

    .search {
      width: 50px;
      height: 50px;
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: center center;
      background-image: url(@/assets/img/discover_icon_search.png);
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

  .scroll-router3-enter,
  .scroll-router3-leave-to {
    transform: translateY(100%);
  }

  .scroll-router3-enter-active,
  .scroll-router3-leave-active {
    transition: all 0.2s linear;
  }

  .scroll-router3-enter-to,
  .scroll-router3-leave {
    transform: translateY(0);
  }
}
</style>