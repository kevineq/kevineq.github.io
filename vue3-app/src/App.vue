<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { Tabbar, TabbarItem } from 'vant';
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { loadOrRefreshDarkMode } from '@/utils/darkmode'
import { storeToRefs } from 'pinia'

const store = useThemeStore()
const { theme } = storeToRefs(store)
const { setTheme } = store
onBeforeMount(() => {
  let theme = loadOrRefreshDarkMode()

  setTheme(theme)
})

const router = useRouter()

const goToSetting = () => {
  router.push('/setting')
}

</script>

<template>
  <div class="w-screen h-screen dark:bg-color5">
    <div class="fixed right-5 top-5 z-20 ">
      <van-icon name="more-o" size="30" @click="goToSetting" class="text-slate-600 dark:text-gray-300" />
    </div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <van-tabbar route :active-color="!theme ? '#666' : '#ccc'" :inactive-color="!theme ? '#ccc' : '#666'">
      <van-tabbar-item :class="!theme ? 'item' : 'dark:bg-color4'" replace to="/home" icon="home-o">首页
      </van-tabbar-item>
      <van-tabbar-item :class="!theme ? 'item' : 'dark:bg-color4'" replace to="/search" icon="search">探索
      </van-tabbar-item>
    </van-tabbar>
  </div>

</template>

<style scoped>
.van-tabbar {
  width: 100vw;
}

.item {
  background-color: #d0eaeb;
}
</style>
