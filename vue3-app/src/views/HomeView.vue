<script setup lang="ts">
import HomeCard from '@/components/HomeCard.vue';
import { Api } from "@/apis"
import type { HomeItem } from "@/typings";
import { ref, onMounted, nextTick } from 'vue'
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { getConcreteDate } from '@/utils/date-tools'


const modules = [Autoplay, Navigation, Pagination, EffectCoverflow];

const HomeList = ref<HomeItem[]>([])

const TomorrowDate = ref(0)

onMounted(async () => {
  let concreteDate = getConcreteDate()
  console.log(concreteDate)
  let { data } = await Api.getHomeList(concreteDate.fromDate, concreteDate.toDate)
  console.log(data)
  HomeList.value = data
  TomorrowDate.value = parseInt(concreteDate.tomorrowDate + '')
  HomeList.value.push({
    id: concreteDate.id,
    article: '',
    title: '',
    date_by_day: TomorrowDate.value
  })
})

const onSwiper = (swiper: any) => {
  swiper.activeIndex = 14
};


const onSlideChange = (swiper: any) => {
  console.log(swiper.activeIndex);
};

</script>

<!-- :autoplay="{
  delay: 2500,
  disableOnInteraction: false,
}" -->

<!-- :pagination="{
  clickable: true,
}" :navigation="true" :spaceBetween="30" -->


<template>
  <div class="view bg-gradient-to-b from-color1 to-color2 dark:bg-gradient-to-b dark:from-color3 dark:to-color3">
    <Swiper :modules="modules" @swiper="onSwiper" @slideChange="onSlideChange" :slidesPerView="1.5"
      :centeredSlides="true" :effect="'coverflow'" :grabCursor="true" :coverflowEffect="{
        depth: 100,
        modifier: 1,
        rotate: 50,
        scale: 1,
        stretch: 0,
        slideShadows: false,
      }">
      <swiper-slide v-for="h in HomeList" :key="h.id">
        <HomeCard :HomeItem="h" :TomorrowDate="TomorrowDate" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
.view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100vh - 50px);
  // background: linear-gradient(#e7f3f3, #d0eaeb);
  display: flex;
  align-items: center;
  z-index: 10;
}

.swiper {
  height: 456px;
}
</style>


