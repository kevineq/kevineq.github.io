<template>
  <div class="home-nav" :style="{ backgroundColor: headColor }">
    <div class="date-bar" @click="goToMonthArticlesView">
      <div class="day" v-if="dateObj">
        <transition name="move">
          <span class="text" :key="dateObj.day">{{ dateObj.day }}</span>
        </transition>
      </div>
      <div class="month">
        <transition name="move" v-if="dateObj">
          <span class="text" :key="dateObj.month">{{ dateObj.month }}</span>
        </transition>
      </div>
      .
      <div class="year">
        <transition name="move" v-if="dateObj">
          <span class="text" :key="dateObj.year">{{ dateObj.year }}</span>
        </transition>
      </div>
      <span class="tail"></span>
    </div>

    <div class="detail-bar" :style="{ opacity: headOpacity }">
      <span>{{ weather.city_name }}</span>
      <span>{{ weather.climate }}</span>
      <span>{{ weather.temperature }}℃</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    weather: {
      type: Object,
      required: true,
    },
    dateObj: Object,
    scorll: Number
  },
  computed: {
    headOpacity() {
      let o = Math.floor((1 - this.scorll / 600) * 100) / 100;
      o = o >= 0 ? o : 0;

      return o;
    },
    headColor() {
      let o = this.headOpacity >= 0.6 ? this.headOpacity : 0.6;
      return `rgba(255,255,255,${o})`;
    },
  },
  methods: {
    goToMonthArticlesView() {
      // console.log(this.$route.path);
      // 当前已经在month article 中
      if (this.$route.name == "month-article") {
        this.$router.go(-1);
      } else {
        this.$router.push(
          `${this.$route.path}/month-article`
        );
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
  position: sticky;
  top: 0;
  left: 0;
  padding: 0 12px 10px;
  width: 100vw;
  height: 50px;
  font-size: 12px;
  // background-color: rgba(255, 255, 255, 1);
  z-index: 10;

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
    margin-left: 7px;
    color: #bbb;
  }
}
</style>