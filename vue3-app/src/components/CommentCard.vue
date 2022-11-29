<script setup lang="ts">
import type { CommentItem } from '@/typings'


const props = defineProps<{
  CommentItem: CommentItem
}>()



</script>

<template>
  <div class="card mb-5">
    <div class="flex h-12 items-center">
      <img :src="CommentItem.user.avatar" class="w-8 h-8 rounded-full mr-2">
      <div class="text-gray-400">{{ CommentItem.user.nickname }}</div>
    </div>
    <div class="article leading-7">
      {{ CommentItem.content }}
    </div>
  </div>
</template>



<style lang="scss" scoped>
.article {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>



