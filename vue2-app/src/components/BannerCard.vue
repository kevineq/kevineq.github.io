<template>
  <div class="list-item">
    <div class="pic">
      <img v-lazy="listItem.cover" />
    </div>
    <div class="text">{{ listItem.title }}</div>
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
.list-item {
  width: calc(100vw - 20px);
  background-color: #f6f6f6;
  margin: 0 10px 40px 10px;

  .pic {
    width: 100%;

    img {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      width: 100%;
      display: block;
    }
  }

  .text {
    box-shadow: 0px 1px 9px #ddd;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    padding: 0 10px;
  }
}
</style>