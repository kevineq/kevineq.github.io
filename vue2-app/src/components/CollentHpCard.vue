<template>
  <div class="month-article" @click="$emit('select', listItem.date)">
    <div class="date-img">
      <img v-lazy="listItem.imgUrl" class="lazyload-img" />
      <div class="date-volume">{{ listItem.volume }}</div>
      <div class="date-dateObj">{{ listItem.dateObj }}</div>
    </div>
    <div class="date-text">
      <div class="van-multi-ellipsis--l2">
        {{ listItem.forward }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listItem: Object,
  },
};
</script>

<style lang="scss" scoped>
.month-article {
  width: calc(50% - 7.5px);
  margin-bottom: 20px;

  .date-img {
    position: relative;
    color: #eee;
    font-size: 12px;

    img {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      width: 100%;
      display: block;
    }

    .date-volume {
      position: absolute;
      bottom: 5px;
      left: 10px;
    }

    .date-dateObj {
      position: absolute;
      bottom: 5px;
      right: 10px;
    }
  }

  .date-text {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0px 1px 10px #ddd;
    padding: 10px;
    font-size: 12px;
    color: #777;
    line-height: 18px;
  }
}
</style>