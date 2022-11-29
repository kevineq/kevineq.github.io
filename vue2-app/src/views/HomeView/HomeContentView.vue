<template>
  <component
    :is="comp"
    :category="category"
    :listItem="listItem"
    @select="selectedDateArticle"
    :keyArr="keyArr"
  />
</template>

<script>
import ArticleCard from "@/components/ArticleCard.vue";
import PhotographCard from "@/components/PhotographCard.vue";

export default {
  props: {
    category: String,
    listItem: Object,
    keyArr: Array,
  },

  computed: {
    comp() {
      return this.category == 0 ? "PhotographCard" : "ArticleCard";
    },
  },

  methods: {
    selectedDateArticle(category, id) {
      this.$router.push({
        path: "/articleDetail",
        query: {
          category,
          id
        },
      });
    },
  },

  components: {
    ArticleCard,
    PhotographCard,
  },
};
</script>