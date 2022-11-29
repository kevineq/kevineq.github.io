<template>
  <div class="list-item" @click="goArticleDetail">
    <div class="cover">
      <img v-lazy="cover" />
    </div>
    <div class="info">
      <div class="title">{{ title }}</div>
      <div class="subtitle">{{ subtitle }}</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    title: String,
    subtitle: String,
    cover: String,
    category: Number,
    id: Number,
  },

  methods: {
    ...mapMutations(["setCollectObj"]),
    goArticleDetail() {
      this.setCollectObj({
        title: this.title,
        subtitle: this.subtitle,
        cover: this.cover,
      });
      this.$emit("select", this.category, this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  width: calc(100vw - 30px);
  display: flex;
  margin-bottom: 20px;

  .cover {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    overflow: hidden;
    margin-right: 15px;

    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  .info {
    width: calc(100% - 75px);
    padding: 5px 0;

    .title {
      height: 25px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 600;
      font-size: 14px;
    }

    .subtitle {
      height: 25px;
      line-height: 25px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>