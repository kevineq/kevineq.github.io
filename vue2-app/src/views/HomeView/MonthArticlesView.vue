<template>
  <div class="month-articles-view">
    <van-pull-refresh
      v-model="pullRefresh"
      @refresh="getNextMonthArticle"
      :disabled="refreshDisable"
    >
      <van-list
        class="month-content"
        v-model="loading"
        @load="onLoad"
        v-if="months.length"
      >
        <div class="month-wrap" v-for="m in months" :key="m.id">
          <div class="month-header">
            <LineComponent color="#ccc" margin="0 10px 0 0" offsetY="7px" />
            <h3>{{ m.month }}月</h3>
            <LineComponent color="#ccc" margin="0 0 0 10px" offsetY="7px" />
          </div>
          <div class="article-wrap">
            <MonthArticle
              v-for="a in m.articles"
              :key="a.id"
              :cover="a.cover"
              :date="a.date"
              @select="selectedDateArticle"
            />
          </div>
        </div>
      </van-list>
      <van-loading v-if="isloading" class="loading" />
    </van-pull-refresh>
  </div>
</template>

<script>
import { debounce } from "lodash-es";
import MonthArticle from "@/components/MonthArticle.vue";
import LineComponent from "@/components/LineComponent.vue";

export default {
  data() {
    return {
      months: [],
      nextDate: 0,
      prevDate: 0,
      isloading: true,
      loading: false,
      pullRefresh: false,
    };
  },
  computed: {
    currentDate() {
      return this.$route.params.date;
    },
    currentMonth() {
      let m = new Date().getMonth();
      if (this.currentDate != 0) {
        m = new Date(this.currentDate).getMonth();
      }
      return m;
    },
    refreshDisable() {
      let nowMonth = new Date().getMonth();
      if (!this.nextDate && this.currentMonth == nowMonth) {
        return true;
      }
      let nextMonth = new Date(this.nextDate).getMonth();
      if (nextMonth < nowMonth) {
        return false;
      }
      return true;
    },
  },

  created() {
    this.getMonthArtics = debounce(this.getMonthArtics);
  },

  mounted() {
    this.getMonthArtics(this.currentDate);
  },

  methods: {
    getMonthArtics(date) {
      this.loading = true;
      let month = this.currentMonth;
      if (date != 0) {
        month = new Date(date).getMonth();
      }
      this.$axios(`https://apis.netstart.cn/one/feeds/list/${date}`).then(
        ({ data }) => {
          // console.log(data);
          this.months = [
            ...this.months,
            {
              id: date,
              month: month + 1,
              articles: data.data,
            },
          ];
          this.$nextTick(() => {
            this.loading = false;
            this.isloading = false;
          });
        }
      );
    },

    onLoad() {
      if (!this.prevDate) {
        this.prevDate = this.currentDate;
      }
      let d = this.prevDate != 0 ? new Date(this.prevDate) : new Date();
      d.setMonth(d.getMonth() - 1);
      let m = d.getMonth() + 1;
      m = m >= 10 ? m : "0" + m;
      this.prevDate = d.getFullYear() + "-" + m;
      this.getMonthArtics(this.prevDate);
    },

    getNextMonthArticle() {
      this.pullRefresh = true;
      if (!this.nextDate) {
        this.nextDate = this.currentDate;
      }
      let d = this.nextDate != 0 ? new Date(this.nextDate) : new Date();
      d.setMonth(d.getMonth() + 1);
      let m = d.getMonth() + 1;
      m = m >= 10 ? m : "0" + m;
      this.nextDate = d.getFullYear() + "-" + m;
      this.$axios(
        `https://apis.netstart.cn/one/feeds/list/${this.nextDate}`
      ).then(({ data }) => {
        // console.log(data);
        this.months = [
          {
            id: this.nextDate,
            month: m,
            articles: data.data,
          },
          ...this.months,
        ];
        this.$nextTick(() => {
          this.pullRefresh = false;
        });
      });
    },

    selectedDateArticle(date) {
      this.$router.replace({ path: `/home/${date}` });
    },
  },
  components: {
    MonthArticle,
    LineComponent,
  },
};
</script>

<style lang="scss" scoped>
.month-articles-view {
  position: fixed;
  height: calc(100vh - 104px);
  top: 50px;
  width: 100vw;
  background-color: #fff;
  overflow: auto;

  .month-content {
    padding: 0 15px;
  }

  .month-header {
    display: flex;
    color: #999;
  }

  .article-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
  }

  .loading {
    width: 30px;
    height: 30px;
    margin: 0 auto;
    color: #000;
  }
}
</style>