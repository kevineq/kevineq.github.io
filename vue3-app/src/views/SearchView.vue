<script setup lang="ts">
import SearchCard from '@/components/SearchCard.vue';
import { Api } from "@/apis"
import { ref, onMounted, computed } from 'vue'
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation, Pagination, EffectCards } from 'swiper';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import type { SearchCommentItem, SearchLessonsItem } from "@/typings";
import CommentCard from '@/components/CommentCard.vue';
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import type { Swiper as SwiperType } from 'swiper'


const store = useThemeStore()
const { theme } = storeToRefs(store)

const modules = [Autoplay, Navigation, Pagination, EffectCards];

const commentList = ref<SearchCommentItem[]>([])
const lessonsList = ref<SearchLessonsItem[]>([])

const searchCommentItem = ref()

const comment = ref(0)

onMounted(async () => {
  let { data } = await Api.getSearchList()
  console.log(data)
  commentList.value = data.comments
  lessonsList.value = data.lessons
})

const onSwiper = (swiper: SwiperType) => {
  console.log(swiper);
};

const onSlideChange = (swiper: SwiperType) => {
  console.log(swiper.activeIndex);
};

const show1 = ref<boolean>(false)

const show2 = ref<boolean>(false)

const CommentList = ref<SearchCommentItem[]>([])

const showPopup1 = async (data1: SearchCommentItem) => {
  CommentList.value = []
  show1.value = true
  searchCommentItem.value = data1
  console.log(data1.id)
  let { data } = await Api.getCommentsList(data1.id)
  console.log(data)
  CommentList.value = data
}

const showPopup2 = () => {
  show2.value = true
}

const text = ref<string>('')

const textCount = computed(() => {
  return 500 - text.value.length;
})

const bgColor = computed(() => {
  return text.value.length > 0 ? "#fff" : "#ccc";
})

const submit = () => {
  if (!text.value) {
    return
  }
  CommentList.value.unshift({
    id: '0',
    content: text.value,
    user: {
      id: '0',
      nickname: 'Kevin',
      avatar: 'http://pics.tide.moreless.io/fetch_avatars/FkPZp3bYPK2FS9I24UyLUrMo8x6d',
    },
    like_count: 0,
    sub_comment_count: 0
  })
  text.value = ''
  show2.value = false
}
</script>

<!-- perSlideOffset: 0,
perSlideRotate: 100,
rotate: true, -->

<template>
  <div class="view bg-gradient-to-b from-color1 to-color2 dark:bg-gradient-to-b dark:from-color3 dark:to-color3">
    <Swiper :modules="modules" @swiper="onSwiper" @slideChange="onSlideChange" :centeredSlides="true" :effect="'cards'"
      :grabCursor="true" :cardsEffect="{
        slideShadows: false,
      }">
      <swiper-slide v-for="c in commentList" :key="c.id">
        <SearchCard :SearchItem="c" @showPopup="showPopup1" />
      </swiper-slide>
    </swiper>

    <van-popup v-model:show="show1"
      class="w-5/6 h-5/6 overflow-hidden rounded-2xl dark:bg-color6 dark:text-gray-300 border-gray-300 border border-solid">
      <div class="view2 px-4 dark:text-gray-300">
        <div class="flex items-center py-4 border-b border-solid border-gray-400 dark:border-gray-600">
          <img class="w-8 h-8 rounded-full mr-3" :src="searchCommentItem.user.avatar">
          <div> {{ searchCommentItem.user.nickname }}</div>
          <van-icon name="ellipsis" class="ml-auto" size="20" />

        </div>

        <div class="article pt-3 leading-7 text-gray-600 text-justify dark:text-gray-300">
          {{ searchCommentItem.content }}
        </div>

        <div class="img" :class="theme ? 'img2' : 'img1'"></div>

        <div class="flex h-10 items-center px-2 text-sm text-gray-600 dark:text-gray-300">
          <van-icon name="comment-o" class="mr-1" /> {{ searchCommentItem.sub_comment_count }}
          <van-icon name="like-o" class=" ml-4 mr-1" /> {{ searchCommentItem.like_count }}
          <van-icon name="share-o" class="ml-auto" />
        </div>

        <div>
          <div class="h-10 leading-10 text-sm text-gray-600 dark:text-gray-300">评论{{ CommentList.length }}</div>
          <div v-for="c in CommentList" :key="c.id">
            <CommentCard :CommentItem="c" />
          </div>
        </div>
      </div>

      <div class="fixed bottom-0 w-full flex h-16 px-4 items-center bg-white dark:bg-color6">
        <img src="http://pics.tide.moreless.io/fetch_avatars/FkPZp3bYPK2FS9I24UyLUrMo8x6d"
          class="w-10 h-10 rounded-full">
        <div @click="showPopup2"
          class="flex-1 h-10 leading-10 px-3 rounded-full border border-solid mx-3 border-gray-400 text-sm text-gray-400">
          添加评论...</div>

        <div class=" w-10 h-10 rounded-full border border-solid border-gray-400">

          <label for="checkbox">
            <input type="checkbox" id="checkbox" hidden>
            <svg t="1668823606156" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="7118">
              <path
                d="M512 896a42.666667 42.666667 0 0 1-30.293333-12.373333l-331.52-331.946667a224.426667 224.426667 0 0 1 0-315.733333 223.573333 223.573333 0 0 1 315.733333 0L512 282.026667l46.08-46.08a223.573333 223.573333 0 0 1 315.733333 0 224.426667 224.426667 0 0 1 0 315.733333l-331.52 331.946667A42.666667 42.666667 0 0 1 512 896z"
                p-id="7119" id="heart"></path>
            </svg>
            <span></span>
          </label>
          <!-- <van-icon name="like-o" class="like text-gray-600 dark:text-gray-300" size="20" /> -->
        </div>
      </div>
    </van-popup>

    <van-popup v-model:show="show2" position="bottom" class="p-5 dark:bg-color6">
      <textarea placeholder="在这里写下你想说的..." v-model="text" class="dark:bg-color6 dark:text-gray-100"></textarea>
      <div class="flex justify-between items-center">
        <div class="text-gray-400">{{ textCount }}</div>
        <div class="text-sm px-4 py-1.5 border border-solid rounded-full border-gray-400 text-gray-600"
          :style="{ backgroundColor: bgColor }" @click="submit">
          发送
        </div>
      </div>
    </van-popup>

  </div>
</template>

<style lang="scss" scoped>
.view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100vh - 50px);
  // background-image: linear-gradient(#e7f3f3, #d0eaeb);
  display: flex;
  align-items: center;
  z-index: 10;
  --c: #ff6b81;
  overflow: hidden;
}

.swiper {
  width: 250px;
  height: 400px;
}

.swiper-slide {
  border-radius: 20px;
}

.img {
  width: 280px;
  height: 75px;
  background-size: cover;
  margin: 50px auto 0;
}

.img1 {
  background-image: url(@/assets/微信图片_20221118204927.jpg);
}

.img2 {
  background-image: url(@/assets/微信图片_20221122144501.jpg);
}

.like {
  margin: 5px;
}

textarea {
  width: 100%;
  height: 100px;
  border: none;
  padding: 0;
  overflow: auto;
}

textarea::-webkit-input-placeholder {
  color: #999;
  font-size: 14px;
}

.view2 {
  position: fixed;
  top: 0;
  height: calc(100% - 64px);
  overflow: auto;
}

svg {
  position: absolute;
  bottom: 17px;
  right: 22px;
  width: 28px;
  /* z-index: 10; */
}

#heart {
  fill: #eee;
  stroke: var(--c);
  stroke-width: 50;
  stroke-dasharray: 2600;
  stroke-dashoffset: 2600;
  stroke-linecap: round;
}

span {
  display: block;
  width: 5px;
  height: 5px;
  background-color: transparent;
  border-radius: 50%;
  position: absolute;
  bottom: 30px;
  right: 34px;
  transform: scale(0);
  box-shadow: 0 -30px 0 0 var(--c), 0 30px 0 0 var(--c), -30px 0 0 var(--c), 30px 0 0 var(--c), -22px -22px 0 var(--c), 22px -22px 0 var(--c), 22px 22px 0 var(--c), -22px 22px 0 var(--c);
}

#checkbox:checked+svg #heart {
  animation: drawHeart 1s linear forwards;
}

#checkbox:checked~span {
  animation: blink 0.5s ease-in-out forwards;
  animation-delay: 0.85s;
}

#checkbox:checked+svg {
  animation: beat 1s linear forwards;
}

label {
  cursor: pointer;
}

@keyframes drawHeart {
  0% {
    stroke-dasharray: 2600;
  }

  80% {
    fill: #eee;
    stroke-dasharray: 0;
  }

  100% {
    fill: var(--c);
    stroke-dasharray: 0;
  }
}

@keyframes blink {
  0% {
    transform: scale(0.5);
    opacity: 0.8;
  }

  50% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(1.1);
    opacity: 0;
  }
}

@keyframes beat {
  0% {
    transform: scale(1);
  }

  70% {
    transform: scale(1);
  }

  80% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

// .swiper-slide:nth-child(1n) {
//   background-color: rgb(206, 17, 17);
// }

// .swiper-slide:nth-child(2n) {
//   background-color: rgb(0, 140, 255);
// }

// .swiper-slide:nth-child(3n) {
//   background-color: rgb(10, 184, 111);
// }

// .swiper-slide:nth-child(4n) {
//   background-color: rgb(211, 122, 7);
// }

// .swiper-slide:nth-child(5n) {
//   background-color: rgb(118, 163, 12);
// }

// .swiper-slide:nth-child(6n) {
//   background-color: rgb(180, 10, 47);
// }

// .swiper-slide:nth-child(7n) {
//   background-color: rgb(35, 99, 19);
// }

// .swiper-slide:nth-child(8n) {
//   background-color: rgb(0, 68, 255);
// }

// .swiper-slide:nth-child(9n) {
//   background-color: rgb(218, 12, 218);
// }

// .swiper-slide:nth-child(10n) {
//   background-color: rgb(54, 94, 77);
// }
</style>