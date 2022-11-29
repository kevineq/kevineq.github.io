<template>
  <div
    class="month-articles-view"
    ref="monthView"
    @scroll.passive="scrollhandle"
  >
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
        <van-sticky offset-top="90px">
          <div class="current-date" @click="showDate">
            {{ year }}年{{ month }}月
            <van-icon
              class="arrow-icon"
              name="arrow-down"
              size="12"
              color="#000"
            />
          </div>
        </van-sticky>
        <div class="month-wrap" v-for="m in months" :key="m.id">
          <div class="month-header">
            <LineComponent color="#ccc" margin="0 10px 0 0" offsetY="15px" />
            <h3 ref="year" :style="{ fontSize: '0' }">{{ m.year }}年</h3>
            <h3 ref="month">{{ m.month }}月</h3>
            <LineComponent color="#ccc" margin="0 0 0 10px" offsetY="15px" />
          </div>
          <div class="article-wrap">
            <EssayCard
              v-for="a in m.articles"
              :key="a.id"
              :title="a.title"
              :subtitle="a.subtitle"
              :cover="a.cover"
              :category="a.category"
              :id="a.id"
              @select="selectedDateArticle"
            />
          </div>
        </div>
      </van-list>
      <van-loading v-if="isloading" class="loading" />
    </van-pull-refresh>
    <van-popup v-model="playShow" position="top">
      <van-datetime-picker
        v-model="currentDates"
        type="year-month"
        title="选择日期"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="confirm"
        @cancel="cancel"
      />
    </van-popup>
  </div>
</template>

<script>
import LineComponent from "@/components/LineComponent.vue";
import { debounce } from "lodash-es";
import EssayCard from "@/components/EssayCard.vue";
import { getArticleList, titleIndexs } from "@/utils/apis/articlecontent";
export default {
  data() {
    return {
      months: [],
      minDate: new Date(2015, 0),
      maxDate: new Date(2022, 10),
      currentDates: new Date(),
      playShow: false,
      isloading: true,
      loading: false,
      pullRefresh: false,
      nextDate: 0,
      prevDate: 0,
      year: 2022,
      month: 11,
      currentDate: "2022-11",
    };
  },

  created() {
    this.getData = debounce(this.getData);
  },
  mounted() {
    this.getData(this.currentDate);
  },

  computed: {
    currentMonth() {
      return new Date(this.currentDate).getMonth();
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

  methods: {
    selectedDateArticle(category, id) {
      this.$router.push({
        path: "/articleDetail",
        query: {
          category,
          id,
        },
      });
    },

    scrollhandle() {
      let scorll = this.$refs.monthView.scrollTop;
      this.$refs.month.sort((a, b) => {
        return b.innerHTML.slice(0, -1) - a.innerHTML.slice(0, -1);
      });
      this.$refs.month.forEach((item) => {
        if (scorll >= item.offsetTop) {
          this.month = item.innerHTML.slice(0, -1);
        }
      });
      this.$refs.year.forEach((item) => {
        if (scorll >= item.offsetTop) {
          this.year = item.innerHTML.slice(0, -1);
        }
      });
    },

    getNextMonthArticle() {
      this.pullRefresh = true;
      if (!this.nextDate) {
        this.nextDate = this.currentDate;
      }
      let d = this.nextDate != 0 ? new Date(this.nextDate) : new Date();
      d.setMonth(d.getMonth() + 1);
      let y = d.getFullYear();
      let m = d.getMonth() + 1;
      m = m >= 10 ? m : "0" + m;
      this.year = y;
      this.month = m;
      this.nextDate = d.getFullYear() + "-" + m;
      let category = titleIndexs[this.$route.path.slice(10)];
      getArticleList({
        axios: this.$axios,
        category,
        date: this.nextDate,
      }).then(({ data }) => {
        // console.log(data);
        this.months = [
          {
            id: this.nextDate,
            year: y,
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

    getData(date) {
      this.loading = true;
      let y = new Date(date).getFullYear();
      let m = new Date(date).getMonth() + 1;
      m = m >= 10 ? m : "0" + m;
      let category = titleIndexs[this.$route.path.slice(10)];
      getArticleList({
        axios: this.$axios,
        category,
        date,
      }).then(({ data }) => {
        // console.log(data);
        if (data.data.length == 0) {
          this.onLoad();
          return;
        }
        this.months = [
          ...this.months,
          {
            id: date,
            year: y,
            month: m,
            articles: data.data,
          },
        ];
        this.$nextTick(() => {
          this.loading = false;
          this.isloading = false;
        });
      });
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
      this.getData(this.prevDate);
    },

    showDate() {
      this.playShow = true;
    },

    confirm(value) {
      // console.log(value);
      this.year = value.getFullYear();
      this.month = value.getMonth() + 1;
      this.month = this.month >= 10 ? this.month : "0" + this.month;
      this.currentDate = this.year + "-" + this.month;
      this.currentDates = value;
      this.nextDate = 0;
      this.prevDate = 0;
      this.months = [];
      this.getData(this.currentDate);
      this.playShow = false;
    },

    cancel() {
      this.playShow = false;
    },

    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      }
      return value;
    },
  },
  components: {
    LineComponent,
    EssayCard,
  },
};
</script>

<style lang="scss" scoped>
.month-articles-view {
  position: fixed;
  top: 90px;
  width: 100vw;
  height: calc(100vh - 145px);
  overflow: auto;
  margin-top: 1px;

  .month-content {
    padding: 0 15px;
  }

  .month-header {
    display: flex;
    color: #999;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
  }

  .article-wrap {
    margin-top: 10px;
  }

  .current-date {
    font-size: 14px;
    width: 100%;
    text-align: center;
    height: 30px;
    line-height: 30px;
    background-color: #fff;
  }

  .arrow-icon {
    transform: translateY(-1px);
  }

  .loading {
    width: 30px;
    height: 30px;
    margin: 0 auto;
    color: #000;
  }
}
</style>