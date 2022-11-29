import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', () => {
  const articleId = ref('')

  function setArticleId(id: string) {
    articleId.value = id
  }

  return { articleId, setArticleId }
})
