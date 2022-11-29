import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import SettingView from '../views/SettingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '',
    redirect: "/home"
  },
  {
    path: '/',
    redirect: "/home"
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/detail/:id',
    name: 'detail',
    props: true,
    component: () => import('@/views/ArticleDetailView.vue'),
  },
  {
    path: '/setting',
    name: 'setting',
    component: SettingView
  },
  ]
})

export default router
