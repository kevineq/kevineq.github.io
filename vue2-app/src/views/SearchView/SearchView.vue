<template>
  <div class="search-view">
    <van-search
      v-model="value"
      show-action
      placeholder="在这里写下你想寻找的"
      @search="onSearch"
      @cancel="onCancel"
      background="#f8f8f8"
      autofocus
    />

    <van-tabs
      v-model="active"
      v-if="show"
      color="#000"
      title-active-color="#000"
      title-inactive-color="#999"
      @click="toggleType"
    >
      <van-tab v-for="index in searchTypes" :title="index" :key="index">
      </van-tab>
    </van-tabs>

    <div class="content" v-if="!show">
      <div
        class="item"
        v-for="t in searchTypeList"
        :key="t"
        @click="goArticleType(t)"
      >
        {{ t }}
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
import {
  searchTypeList,
  searchTypes,
  searchEngTypes,
} from "@/utils/discoverType";

import { titleCategory } from "@/utils/apis/articlecontent";
import { debounce } from "lodash-es";
import { mapState } from "vuex";

export default {
  data() {
    return {
      searchTypeList,
      searchTypes,
      value: "",
      show: false,
      transitionName: "",
      preventIndex: 0,
      go: -1,
    };
  },

  computed: {
    ...mapState(["active"]),
  },

  created() {
    this.toggleType = debounce(this.toggleType);
  },

  methods: {
    onSearch() {
      this.show = true;
      this.toggleType(this.active);
    },
    onCancel() {
      this.$router.go(this.go);
    },

    toggleType(index) {
      // console.log(index);ss
      this.go--;
      if (index > this.preventIndex) {
        this.transitionName = "scroll-router1";
      } else if (index < this.preventIndex) {
        this.transitionName = "scroll-router2";
      }
      this.preventIndex = index;
      let type = searchEngTypes[index];
      this.$router.push({
        path: `/search/${type}`,
        query: {
          category: index,
          keyword: this.value,
        },
      });
    },

    goArticleType(t) {
      let category = titleCategory[t];
      this.$router.push({
        path: `/search/searchDetail`,
        query: {
          category,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.search-view {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  background-color: #fff;
  overflow: auto;

  .van-search__content {
    background: #fff;
  }

  .van-search__action {
    color: #777;
  }

  .content {
    height: calc(100% - 54px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .item {
      margin: 20px 0;
      color: #777;
      font-size: 14px;
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