<template>
  <div class="list-item" ref="follow">
    <div class="cover">
      <img v-lazy="listItem.web_url" />
    </div>
    <div class="info">
      <div class="name">{{ listItem.user_name }}</div>
      <div class="desc">{{ listItem.desc }}</div>
    </div>
    <div class="follow" :class="{ active: isFollow }" @click="follow">
      {{ isFollow ? "已关注" : "关注" }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listItem: Object,
    keyArr: Array,
  },

  data() {
    return {
      isFollow: false,
    };
  },

  created() {
    this.followYesOrNo();
  },

  methods: {
    followYesOrNo() {
      this.$nextTick(() => {
        let index = this.keyArr.indexOf(this.listItem.user_id);
        if (index > -1) {
          this.isFollow = true;
        }
      });
    },

    follow() {
      if (this.isFollow == false) {
        let key = "follow-" + this.listItem.user_id;
        let value = {
          id: this.listItem.user_id,
          webUrl: this.listItem.web_url,
          name: this.listItem.user_name,
          desc: this.listItem.desc,
        };
        value = JSON.stringify(value);
        localStorage[key] = value;
        this.isFollow = true;
      } else {
        let key = "follow-" + this.listItem.user_id;
        localStorage.removeItem(key);
        this.isFollow = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  width: 100vw;
  display: flex;
  margin-bottom: 20px;
  padding: 0 15px;
  height: 60px;
  align-items: center;

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
    width: calc(100% - 115px);

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
      color: #999;
    }
  }

  .follow {
    width: 50px;
    height: 22px;
    line-height: 20px;
    text-align: center;
    border-radius: 999px;
    border: 1px solid #333;
    color: #333;
    margin-left: auto;
    font-size: 12px;

    &.active {
      border: 1px solid #999;
    }
  }
}
</style>