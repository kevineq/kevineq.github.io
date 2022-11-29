<template>
  <div class="content-detail-view">
    <van-nav-bar :title="contentTitle" fixed>
      <template #left>
        <van-icon name="arrow-left" size="20" color="#bbb" @click="back" />
      </template>
    </van-nav-bar>

    <div class="content-warp">
      <ContentCard class="animate" v-for="c in contentList" :key="c.id" :listItem="c" />
    </div>

    <div class="content-warp1" v-if="category == 'set'" @click="backLogin">
      退出登录
    </div>
  </div>
</template>

<script>
import ContentCard from "@/components/ContentCard.vue";

export default {
  props: {
    contentTitle: String,
  },

  data() {
    return {
      contentList: [],
      category: "",
    };
  },

  created() {
    this.getData();
  },

  methods: {
    backLogin() {
      localStorage.removeItem("userLogin");
      this.$router.replace("/user");
    },

    back() {
      this.$router.go(-1);
    },

    getData() {
      let category = this.$route.query.category;
      this.category = category;
      if (category == "set") {
        return;
      }
      let keyArr = [];
      let dataArr = [];
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.slice(0, 6) == this.$route.query.category) {
          keyArr.push(key);
        }
      }
      for (let j = 0; j < keyArr.length; j++) {
        let data = JSON.parse(localStorage[keyArr[j]]);
        dataArr.push(data);
        this.contentList = dataArr;
      }
    },
  },

  components: {
    ContentCard,
  },
};
</script>

<style lang="scss" scoped>
.content-detail-view {
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
    text-align: center;
  }

  .animate {
    animation: fadeInBottomRight;
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
 