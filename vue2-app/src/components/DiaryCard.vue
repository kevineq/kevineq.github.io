<template>
  <div class="list-item">
    <img v-lazy="listItem.img_url" />
    <div class="content-warp">
      <div class="content">{{ listItem.content }}</div>
      <div class="info">
        <div class="name" :key="listItem.user_id">
          {{ listItem.user.user_name }}
        </div>
        <div class="time">
          {{ listItem.input_date.split(" ")[0] }}
          <span class="addr">{{ listItem.addr }}</span>
        </div>
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
.list-item {
  margin-bottom: 20px;

  img {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100%;
    display: block;
  }

  .content-warp {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0px 1px 10px #ddd;
    padding: 10px;

    .content {
      line-height: 24px;
      font-size: 14px;
      margin-bottom: 10px;
    }

    .info {
      font-size: 14px;
      color: #999;

      .name {
        line-height: 30px;
      }

      .addr {
        margin-left: 10px;
      }
    }
  }
}
</style>