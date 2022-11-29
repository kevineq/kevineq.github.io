import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'
import DiscoverView from '../views/DiscoverView/DiscoverView.vue'
import SerializeView from '../views/SerializeView/SerializeView.vue'
import UserView from '../views/UserView/UserView.vue'
import LoginView from '../views/UserView/LoginView.vue'
import RegisterView from '../views/UserView/RegisterView.vue'
import ResetView from '../views/UserView/ResetView.vue'
import ResetPasswordView from '../views/UserView/ResetPasswordView.vue'
import ShareView from '../views/ShareView.vue'

Vue.use(VueRouter)

const routes = [{
    path: '',
    redirect: "/home/:date"
  },
  {
    path: '/',
    redirect: "/home/:date"
  },
  {
    path: '/home/:date',
    name: 'home',
    component: HomeView,
    children: [{
      path: 'month-article',
      name: 'month-article',
      component: () => import("../views/HomeView/MonthArticlesView.vue"),
    }]
  },
  {
    path: '/discover',
    name: 'discover',
    component: DiscoverView,
    children: [{
        path: 'essay',
        name: 'discoverEssay',
        component: () => import("../views/DiscoverView/EssayView.vue"),
      },
      {
        path: 'hp',
        name: 'discoverHp',
        component: () => import("../views/DiscoverView/HpView.vue"),
      },
      {
        path: 'banner',
        name: 'discoverBanner',
        component: () => import("../views/DiscoverView/BannerView.vue"),
      },
      {
        path: 'rank',
        name: 'discoverRank',
        component: () => import("../views/DiscoverView/RankView.vue"),
        children: [{
          path: 'rankDetail',
          name: 'rankDetail',
          component: () => import('../views/DiscoverView/RankDetailView.vue')
        }]
      },
      {
        path: 'question',
        name: 'discoverQuestion',
        component: () => import("../views/DiscoverView/QuestionView.vue"),
      },
      {
        path: 'music',
        name: 'discoverMusic',
        component: () => import("../views/DiscoverView/MusicView.vue"),
      },
      {
        path: 'movie',
        name: 'discoverMovie',
        component: () => import("../views/DiscoverView/MovieView.vue"),
      },
      {
        path: 'radio',
        name: 'discoverRadio',
        component: () => import("../views/DiscoverView/RadioView.vue"),
      },
      {
        path: 'diary',
        name: 'discoverDiary',
        component: () => import("../views/DiscoverView/DiaryView.vue"),
      },
      {
        path: 'author',
        name: 'discoverAuthor',
        component: () => import("../views/DiscoverView/AuthorView.vue"),
      },
    ]
  },
  {
    path: '/serialize',
    name: 'serialize',
    component: SerializeView,
    children: [{
        path: '2022',
        name: '2022',
        component: () => import("../views/SerializeView/SerializeView2022.vue"),
      },
      {
        path: '2021',
        name: '2021',
        component: () => import("../views/SerializeView/SerializeView2021.vue"),
      },
      {
        path: '2020',
        name: '2020',
        component: () => import("../views/SerializeView/SerializeView2020.vue"),
      },
      {
        path: '2019',
        name: '2019',
        component: () => import("../views/SerializeView/SerializeView2019.vue"),
      },
      {
        path: '2018',
        name: '2018',
        component: () => import("../views/SerializeView/SerializeView2018.vue"),
      },
      {
        path: '2017',
        name: '2017',
        component: () => import("../views/SerializeView/SerializeView2017.vue"),
      },
      {
        path: '2016',
        name: '2016',
        component: () => import("../views/SerializeView/SerializeView2016.vue"),
      },
      {
        path: 'serializeDetail',
        name: 'serializeDetail',
        component: () => import('../views/SerializeView/SerializeDetailView.vue')
      },
    ]
  }, {
    path: '/articleDetail',
    name: 'articleDetail',
    component: () => import('../views/ArticleDetailView.vue')
  }, {
    path: '/hpDetail',
    name: 'hpDetail',
    component: () => import('../views/HpDetailView.vue')
  }, {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView/SearchView.vue'),
    children: [{
        path: 'hp',
        name: 'searchHp',
        component: () => import("../views/SearchView/SearchHpView.vue"),
      },
      {
        path: 'reading',
        name: 'searchReading',
        component: () => import("../views/SearchView/SearchReadingView.vue"),
      },
      {
        path: 'music',
        name: 'searchMusic',
        component: () => import("../views/SearchView/SearchMusicView.vue"),
      },
      {
        path: 'movie',
        name: 'searchMovie',
        component: () => import("../views/SearchView/SearchMovieView.vue"),
      },
      {
        path: 'radio',
        name: 'searchRadio',
        component: () => import("../views/SearchView/SearchRadioView.vue"),
      },
      {
        path: 'author',
        name: 'searchAuthor',
        component: () => import("../views/SearchView/SearchAuthorView.vue"),
      },
      {
        path: 'searchDetail',
        name: 'searchDetail',
        component: () => import('../views/SearchView/SearchDetailView.vue')
      },
    ]
  }, {
    path: '/user',
    name: 'user',
    component: UserView,
    children: [{
      path: 'userLogin',
      name: 'userLogin',
      component: () => import("../views/UserView/UserLoginView.vue"),
      children: [{
        path: 'collectDetail',
        name: 'collectDetail',
        component: () => import("../views/UserView/CollectDetailView.vue"),
      }, {
        path: 'contentDetail',
        name: 'contentDetail',
        component: () => import("../views/UserView/ContentDetailView.vue"),
      }]
    }]
  }, {
    path: '/login',
    name: 'login',
    component: LoginView
  }, {
    path: '/register',
    name: 'register',
    component: RegisterView
  }, {
    path: '/reset',
    name: 'reset',
    component: ResetView,
    children: [{
      path: 'resetPassword',
      name: 'resetPassword',
      component: ResetPasswordView
    }]
  },
  {
    path: '/share',
    name: 'share',
    component: ShareView
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router