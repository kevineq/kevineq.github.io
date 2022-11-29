<template>
  <van-swipe-cell>
    <div class="list-item" ref="follow">
      <div class="cover">
        <img v-lazy="listItem.webUrl" />
      </div>
      <div class="info">
        <div class="name">{{ listItem.name }}</div>
        <div class="desc">{{ listItem.desc }}</div>
      </div>
      <van-icon name="arrow" color="#999" />
    </div>
    <template #right>
      <van-button
        round
        text="取消关注"
        color="#003153"
        class="delete-button"
        size="small"
        @click="noFollow"
      />
    </template>
  </van-swipe-cell>
</template>

<script>
export default {
  props: {
    listItem: Object,
  },

  methods: {
    noFollow() {
      let key = "follow-" + this.listItem.id;
      localStorage.removeItem(key);
      this.$refs.follow.remove();
    },
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  width: calc(100vw - 30px);
  display: flex;
  height: 60px;
  align-items: center;
  margin-bottom: 10px;

  .cover {
    width: 50px;
    height: 50px;
    border-radius: 999px;
    overflow: hidden;
    margin-right: 15px;

    img {
      width: 100%;
      display: block;
    }
  }

  .info {
    width: calc(100% - 80px);

    .name {
      height: 25px;
      line-height: 25px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 600;
    }

    .desc {
      height: 25px;
      line-height: 25px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      color: #333;
    }
  }

  .arrow {
    margin-left: auto;
    color: #999;
  }
}

.delete-button {
  margin: 14px 0;
}
</style>