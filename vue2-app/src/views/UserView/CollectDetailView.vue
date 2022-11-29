<template>
  <div class="collect-detail-view">
    <van-nav-bar :title="collectTitle" fixed>
      <template #left>
        <van-icon name="arrow-left" size="20" color="#bbb" @click="back" />
      </template>
    </van-nav-bar>

    <div class="content-warp1" v-if="category == 'hp'">
      <CollentHpCard class="animate__animated animate__zoomInRight" v-for="c in contentList" :key="c.id" :listItem="c"
        @select="selectedDateArticle(c.date)" />
    </div>

    <div class="content-warp" v-if="category != 'hp'">
      <CollectMusicCard class="animate" v-for="c in contentList" :key="c.id" :listItem="c"
        @select="selectedDateArticles(c.date)" />
    </div>
  </div>
</template>

<script>
import CollentHpCard from "@/components/CollentHpCard.vue";
import CollectMusicCard from "@/components/CollectMusicCard.vue";

export default {
  props: {
    collectTitle: String,
  },

  data() {
    return {
      contentList: [],
      show: true,
      category: "",
    };
  },

  created() {
    this.getData();
  },

  methods: {
    selectedDateArticle(date) {
      this.$router.push({
        path: "/hpDetail",
        query: {
          date,
        },
      });
    },

    selectedDateArticles(category, id) {
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
      let category = this.$route.query.category;
      this.category = category;
      let keyArr = [];
      let dataArr = [];
      if (category == "hp") {
        for (let i = 0; i < localStorage.length; i++) {
          let key = localStorage.key(i);
          if (key.slice(0, 2) == category) {
            keyArr.push(key);
          }
        }
      } else if (category == "article") {
        for (let i = 0; i < localStorage.length; i++) {
          let key = localStorage.key(i);
          if (key.slice(0, 7) == category) {
            keyArr.push(key);
          }
        }
      } else {
        for (let i = 0; i < localStorage.length; i++) {
          let key = localStorage.key(i);
          if (key.slice(0, 5) == category) {
            keyArr.push(key);
          }
        }
      }
      // console.log(keyArr);
      for (let j = 0; j < keyArr.length; j++) {
        let itemData = localStorage[keyArr[j]];
        let data = JSON.parse(itemData);
        dataArr.push(data);
        this.contentList = dataArr;
      }
    },
  },

  components: {
    CollentHpCard,
    CollectMusicCard,
  },
};
</script>

<style lang="scss" scoped>
.collect-detail-view {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  z-index: 150;
  background-color: #fff;
  overflow: auto;

  .content-warp {
    margin-top: 46px;
    padding: 0 15px;
  }

  .content-warp1 {
    margin-top: 46px;
    padding: 0 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .animate {
    animation: bounceInRight;
    animation-timing-function: ease;
  }

  .animate:nth-of-type(1) {
    animation-duration: 1s;
  }

  .animate:nth-of-type(2) {
    animation-duration: 1.2s;
  }

  .animate:nth-of-type(3) {
    animation-duration: 1.4s;
  }

  .animate:nth-of-type(4) {
    animation-duration: 1.6s;
  }

  .animate:nth-of-type(5) {
    animation-duration: 1.8s;
  }

  .animate:nth-of-type(6) {
    animation-duration: 2s;
  }

  .animate:nth-of-type(7) {
    animation-duration: 2.2s;
  }

  .animate:nth-of-type(8) {
    animation-duration: 2.4s;
  }
}
</style>
 