import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'


export type RoutesQueryProps = {
  login: {
    redirect: string
  }
}



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    // beforeEnter: (to, from, next) => {
    //   authStore.getters.isLoggedIn ? next() : next({ name: 'login' })
    // }
  },
  {
    path: '/login',
    name: 'login',
    props: route => ({ redirect: (route.query as RoutesQueryProps["login"]).redirect }),
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
