import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  // false 表示关闭夜间模式 true 开启夜间模式
  const theme = ref<boolean>(false)

  function setTheme(newTheme: boolean) {
    theme.value = newTheme
  }

  return { theme, setTheme }
})
