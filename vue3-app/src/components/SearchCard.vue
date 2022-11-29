<script setup lang="ts">
import { ref } from "vue"
import type { SearchCommentItem } from '@/typings'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import useClipboard from 'vue-clipboard3';
import { Toast } from 'vant';

const store = useThemeStore()
const { theme } = storeToRefs(store)
const props = defineProps<{
  SearchItem: SearchCommentItem
}>()

const { toClipboard } = useClipboard();
const emit = defineEmits(['showPopup'])

const address = ref<string>("http://localhost:5173/")

const showPopup = () => {
  emit('showPopup', props.SearchItem)
}

const share = () => {
  toClipboard(address.value);
  Toast({
    message: '分享地址已复制到粘贴板',
    position: 'top',
  });
}

</script>

<template>
  <!-- <div class="card" @click="emit('showPopup')"></div> -->
  <div class="card px-3 h-screen bg-white dark:bg-color8 dark:text-gray-300" @click="showPopup">
    <div class="flex items-center py-4 border-b border-solid border-gray-200 dark:border-gray-600">
      <img class="w-7 h-7 rounded-full mr-3" :src="SearchItem.user.avatar">
      <div> {{ SearchItem.user.nickname }}</div>
      <van-icon name="share-o" class=" ml-auto" @click.stop="share" />
    </div>

    <div class="article pt-3 leading-7">
      {{ SearchItem.content }}
    </div>

    <div class="img1" v-if="!theme"></div>

    <div class="img2" v-if="theme"></div>

    <div class="absolute bottom-3 right-3 flex items-center text-sm">
      <van-icon name="comment-o" class="mr-1" /> {{ SearchItem.sub_comment_count }}
      <van-icon name="like-o" class=" ml-3 mr-1" /> {{ SearchItem.like_count }}
    </div>
  </div>


</template>



<style lang="scss" scoped>
.article {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7;
  overflow: hidden;
}

.img1 {
  position: absolute;
  bottom: 50px;
  left: 15px;
  width: 220px;
  height: 58px;
  background-size: cover;
  background-image: url(@/assets/微信图片_20221118204927.jpg);
}

.img2 {
  position: absolute;
  bottom: 50px;
  left: 15px;
  width: 220px;
  height: 58px;
  background-size: cover;
  background-image: url(@/assets/微信图片_20221122144501.jpg);
}
</style>



