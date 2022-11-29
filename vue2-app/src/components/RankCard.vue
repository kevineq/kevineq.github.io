<template>
  <div class="list-item">
    <div class="header" @click="goRankDetail">
      <div class="title">{{ listItem.title }}</div>
      <div class="more">完整榜单 ></div>
    </div>
    <div class="content">
      <div class="pic" @click="$emit('select', listItem.id)">
        <img v-lazy="listItem.img_url" />
      </div>
      <div class="info">
        <div
          class="text"
          v-for="(c, i) in listItem.contents"
          :key="c.id"
          @click="$emit('selects', c.category, c.id)"
        >
          <span class="texts">{{ i + 1 }}.</span>
          <span> {{ c.title }}</span>
        </div>
      </div>
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
    ...mapMutations(["setRankTitle"]),
    goRankDetail() {
      this.setRankTitle(this.listItem.title);
      this.$emit("select", this.listItem.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  width: 100vw;
  padding: 0 15px;
  margin-bottom: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    height: 60px;
    align-items: center;

    .title {
      font-weight: 600;
    }

    .more {
      font-size: 14px;
      color: #ccc;
    }
  }

  .content {
    display: flex;

    .pic {
      width: 90px;
      height: 90px;
      border-radius: 10px;
      overflow: hidden;
      margin-right: 15px;

      img {
        width: 100%;
        display: block;
      }
    }

    .info {
      font-size: 14px;
      width: calc(100% - 105px);

      .text {
        height: 30px;
        line-height: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #666;
      }

      .text:nth-of-type(1) .texts {
        font-weight: 600;
        color: rgba(255, 0, 0, 0.5);
      }

      .text:nth-of-type(2) .texts {
        font-weight: 600;
        color: rgba(255, 166, 0, 0.5);
      }

      .text:nth-of-type(3) .texts {
        font-weight: 600;
        color: rgba(255, 255, 0, 0.5);
      }
    }
  }
}
</style>