<template>
  <div class="home-nav">
    <div class="date-bar" @click="goToMonthArticlesView">
      <div class="day">
        <transition name="move">
          <span class="text" :key="dateObj.day">{{ dateObj.day }}</span>
        </transition>
      </div>
      <div class="month">
        <transition name="move">
          <span class="text" :key="dateObj.month">{{ dateObj.month }}</span>
        </transition>
      </div>
      .
      <div class="year">
        <transition name="move">
          <span class="text" :key="dateObj.year">{{ dateObj.year }}</span>
        </transition>
      </div>
      <span class="tail"></span>
    </div>

    <div class="detail-bar">
      <span>地球 · 对流层</span>
      <span>-273.15℃</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    weather: Object,
    dateObj: Object,
    scorll: Number,
  },
  methods: {
    goToMonthArticlesView() {
      // console.log(this.$route.path);
      if (this.$route.name == "month-article") {
        this.$router.go(-1);
      } else {
        this.$router.push(`${this.$route.path}/month-article`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home-nav {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: fixed;
  top: 0;
  padding: 0 12px 10px;
  width: 100vw;
  height: 50px;
  font-size: 12px;

  .date-bar {
    display: flex;
    font-weight: 600;
    align-items: flex-end;

    .move-enter {
      transform: translateY(100%);
    }
    .move-leave-to {
      transform: translateY(-100%);
    }

    .move-enter-active,
    .move-leave-active {
      transition: all linear 0.5s;
    }

    .move-leave,
    .move-enter-to {
      transform: translateY(0);
    }

    .day,
    .month,
    .year {
      position: relative;

      .text {
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .day {
      margin-right: 2px;
      flex: 0 0 35px;
      height: 28px;
      font-size: 28px;
    }

    .month {
      margin-right: 2px;
      flex: 0 0 23px;
      height: 13px;
    }

    .year {
      margin-left: 2px;
      flex: 0 0 30px;
      height: 13px;
    }

    .tail {
      display: block;
      margin-left: 7px;
      border: 10px solid black;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 0;
      width: 0;
      height: 0;
    }
  }

  .detail-bar span {
    margin-left: 10px;
    color: #555;
  }
}
</style>