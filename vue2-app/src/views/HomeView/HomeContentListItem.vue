<template>
  <component
    :is="comp"
    :category="category"
    :index="index"
    :listItem="listItem"
  />
</template>

<script>
import ArticleCard from "@/components/ArticleCard.vue";
import PhotographCard from "@/components/PhotographCard.vue";

export default {
  props: {
    category: {
      type: String,
      required: true,
    },
    listItem: Object,
    index: Number,
  },
  components: {
    ArticleCard,
    PhotographCard,
  },
  computed: {
    comp() {
      return this.category == 0 ? "PhotographCard" : "ArticleCard";
    },
  },
};
</script>