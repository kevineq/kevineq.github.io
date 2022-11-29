<template>
  <div class="list-item" @click="goSerializeDetail">
    <div class="pic">
      <img v-lazy="listItem.cover" />
      <div class="title">《{{ listItem.title }}》</div>
      <div class="finished">
        {{ listItem.finished == true ? "# 已完结" : "# 连载中" }}
      </div>
      <div class="loyar"></div>
    </div>
    <div class="info">
      <div class="forward">{{ listItem.forward }}</div>
      <div class="subtitle">{{ listItem.subtitle }}</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    listItem: Object,
  },

  methods: {
    ...mapMutations(["setSerializeTitle"]),
    goSerializeDetail() {
      this.setSerializeTitle(this.listItem.title);
      this.$emit("select", this.listItem.serial_id);
    },
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  width: calc(100vw - 20px);
  margin: 10px 10px 30px 10px;

  .pic {
    position: relative;
    width: 100%;

    img {
      width: 100%;
      display: block;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .title {
      position: absolute;
      padding: 0 5px;
      bottom: 20px;
      font-size: 18px;
      color: #fff;
      z-index: 1;
    }

    .finished {
      position: absolute;
      top: 15px;
      left: 15px;
      font-size: 14px;
      color: #fff;
    }

    .loyar {
      position: absolute;
      width: 100%;
      height: 50px;
      bottom: 0;
      background-image: linear-gradient(
        rgba(255, 255, 255, 0),
        rgba(0, 0, 0, 0.4)
      );
    }
  }

  .info {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0px 1px 7px #ccc;
    padding: 10px 10px;

    .forward {
      height: 26px;
      line-height: 26px;
      color: #555;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
    }

    .subtitle {
      height: 26px;
      line-height: 26px;
      color: #999;
      font-size: 13px;
    }
  }
}
</style>