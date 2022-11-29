<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { chooseDarkMode, chooseLightMode } from '@/utils/darkmode'

const store = useThemeStore()
const { theme } = storeToRefs(store)
const { setTheme } = store
const router = useRouter()
const back = () => {
    router.go(-1)
}
const toggleDarkMode = () => {
    if (theme.value) { // 夜间模式
        // 关闭夜间
        chooseLightMode()
        setTheme(false)
    } else {
        chooseDarkMode()
        setTheme(true)
    }
}
</script>

<template>
    <div class="view flex flex-col justify-center dark:bg-slate-900">
        <div class="fixed top-5 left-5 dark:text-slate-200">
            <van-icon name="arrow-left" size="20" @click="back" />
        </div>
        <h3 class="text-center text-xl tracking-widest font-bold dark:text-slate-200">登录每日一度</h3>
        <div class="text-center text-xs py-10 dark:text-slate-200">
            <input class="mr-1 translate-y-0.5" type="checkbox">已经阅读并同意《服务条款》和《隐私协议》
        </div>
        <div class="flex justify-evenly dark:text-slate-200">
            <div class="text-sm text-center" @click="toggleDarkMode">
                <i :class="theme ? 'icon-sun' : 'icon-moon'" class="block text-4xl mb-2"></i>
                {{ theme ? '日间模式' : '夜间模式' }}
            </div>
            <div class="text-sm text-center">
                <i class="icon-settings block text-4xl mb-2"></i>
                设置
            </div>
        </div>
    </div>
</template>

<style>
.view {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    overflow: auto;
    z-index: 20;
}
</style>