<template>
  <div class="list-item">
    <div class="cover">
      <img v-lazy="listItem.cover" />
    </div>
    <div class="info">
      <div class="title">{{ listItem.title }}</div>
      <div class="subtitle">{{ listItem.subtitle }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listItem: Object,
  },

  methods: {
    // selectedDateArticle() {
    //   this.$router.push({
    //     path: "/articleDetail",
    //     query: {
    //       category: this.listItem.category,
    //       id: this.listItem.id,
    //     },
    //   });
    // },
  }
};
</script>

<style lang="scss" scoped>
.list-item {
  width: calc(100vw - 30px);
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #eee;

  .cover {
    width: 50px;
    height: 50px;
    overflow: hidden;
    margin-right: 15px;

    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  .info {
    width: calc(100% - 125px);

    .title {
      height: 25px;
      line-height: 25px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 600;
    }

    .subtitle {
      height: 25px;
      line-height: 25px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      color: #999;
    }
  }
}
</style>