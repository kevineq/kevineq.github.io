<template>
  <van-swipe-cell>
    <div class="list-item" @click="$emit('select', category, id)">
      <div class="cover">
        <img v-lazy="cover" />
      </div>
      <div class="info">
        <div class="title">{{ title }}</div>
        <div class="subtitle">{{ subtitle }}</div>
      </div>
    </div>
    <template #right>
      <van-button
        round
        text="取消收藏"
        color="#003153"
        class="delete-button"
        size="small"
        @click="noCollect"
      />
    </template>
  </van-swipe-cell>
</template>



<script>
export default {
  props: {
    listItem: Object,
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

.delete-button {
  margin: 12px 0;
}
</style>