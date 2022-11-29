<template>
  <div class="month-article" @click="$emit('select', date)">
    <img v-lazy="cover" class="lazyload-img" />
    <div class="date-text">{{ dateStr }}</div>
  </div>
</template>

<script>
export default {
  props: {
    cover: String,
    date: String,
  },
  computed: {
    dateStr() {
      return this.date.split("-").join(" / ");
    },
  },
};
</script>

<style lang="scss" scoped>
.month-article {
  flex: 0 0 calc(50% - 7.5px);
  margin-bottom: 20px;
  width: calc(50% - 7.5px);

  img {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: block;
    width: 100%;
  }

  .date-text {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0px 1px 10px #ddd;
    padding: 15px;
    text-align: center;
    font-size: 16px;
    color: #777;
  }
}
</style>