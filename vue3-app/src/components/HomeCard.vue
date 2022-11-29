<script setup lang="ts">
// import { Button } from 'vant';
import { ref, computed, onMounted } from 'vue'
import { getDate, getMonAndDayObj, getWeek } from '@/utils/date-tools'
import canlerdar from 'solarday2lunarday'
import type { HomeItem } from '@/typings'
import 'swiper/css';
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'

const store = useThemeStore()
const { theme } = storeToRefs(store)

const router = useRouter()

const props = defineProps<{
  HomeItem: HomeItem,
  TomorrowDate: number
}>()

const timer = ref<number>()
const dateObj2 = ref()
const dateObj3 = ref();

const dateObj1 = computed(() => {
  let date = getDate(props.HomeItem.date_by_day)
  let mdObj = getMonAndDayObj(date)
  let week = getWeek(date)
  dateObj2.value = canlerdar.solar2lunar(date)
  if (props.HomeItem.date_by_day == props.TomorrowDate) {
    let startTime = new Date().getTime();
    let endTime = new Date(date + ' 00:00:00').getTime();
    let time = (endTime - startTime) / 1000;
    timer.value = setInterval(() => {
      let h = parseInt(time / 60 / 60 % 24 + '');
      let m = parseInt(time / 60 % 60 + '');
      let s = parseInt(time % 60 + '');
      time--;
      dateObj3.value = {
        h: h >= 10 ? '' + h : '0' + h,
        m: m >= 10 ? '' + m : '0' + m,
        s: s >= 10 ? '' + s : '0' + s
      }
      // if (time <= 0) {
      //   if (timer.value !== undefined) {
      //     clearInterval(timer.value)
      //     timer.value = undefined
      //   }
      // }
    }, 1000)

  }
  return {
    ...mdObj,
    week,
  }
})

const goArticleDetail = () => {
  if (props.HomeItem.date_by_day == props.TomorrowDate) {
    return
  }
  router.push(`/detail/${props.HomeItem.id}`)
}

// const canvas = ref();
// onMounted(() => {
//   const ctx = canvas.value.getContext('2d');
//   ctx.beginPath();
//   ctx.fillStyle = 'rgba(255,255,255,0.4)';
//   ctx.arc(150, 150, 150, -2 * Math.PI / 2, -2 * Math.PI / 4);
//   ctx.lineTo(150, 150)
//   ctx.fill();
// })

</script>

<template>
  <div class="card relative bg-white dark:bg-color5 dark:text-gray-300" @click="goArticleDetail">
    <div class="flex pl-5 pt-5">
      <div class="text-4xl mr-1"> {{ dateObj1.d }}</div>
      <div class="text-sm">
        <div> {{ dateObj1.week }}</div>
        <div>
          {{ dateObj2.fullLunarMonthString }}</div>
      </div>
    </div>

    <div class="absolute top-5 right-5 w-6 text-2xl" v-if="HomeItem.title">{{ HomeItem.title }}</div>

    <div class="article1 px-4 mt-40 leading-7" v-if="HomeItem.article && !theme">
      {{ HomeItem.article }}
    </div>

    <div class="article2 px-4 mt-40 leading-7" v-if="HomeItem.article && theme">
      {{ HomeItem.article }}
    </div>

    <!-- <canvas class="canvas" ref="canvas" width="300" height="300"></canvas> -->

    <div class="flex justify-between px-4 h-10 leading-10 items-center" v-if="HomeItem.title">
      <div class="text-gray-400">
        66 喜欢 · 66 想法
      </div>
      <div class="read text-white dark:text-black">阅读</div>
    </div>

    <div class="text-center mt-80 text-gray-400" v-if="dateObj3">
      <div>距离日更新还有</div>
      <div>{{ dateObj3.h }}时{{ dateObj3.m }}分{{ dateObj3.s }}秒</div>
    </div>

  </div>
</template>



<style lang="scss" scoped>
.card {
  height: 100%;
  border-radius: 20px;
}

.article1,
.article2 {
  position: relative;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7;
  overflow: hidden;
}

.article1::after {
  position: absolute;
  bottom: -130px;
  right: -60px;
  content: "";
  width: 300px;
  height: 300px;
  border-top-left-radius: 120px;
  background-image: radial-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.1));
  // border: 150px solid rgba(255, 255, 255, 0.6);
  // border-top: 150px solid transparent;
  // border-bottom: 0;
  // border-left: 0;
  // width: 0px;
  background-position: 30px 30px
}

.article2::after {
  position: absolute;
  bottom: -130px;
  right: -60px;
  content: "";
  width: 300px;
  height: 300px;
  border-top-left-radius: 120px;
  background-image: radial-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.1));
  background-position: 30px 30px
}

.canvas {
  position: absolute;
  bottom: -110px;
  right: -134px;
}

.read {
  border-radius: 999px;
  width: 50px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  background-color: #ecbc7d;
  font-size: 14px;
}
</style>



