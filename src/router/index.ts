import { createRouter, createWebHistory, RouteParamsRawGeneric, RouteRecordRaw } from 'vue-router'



function makeExtendedRouter<T extends {
  [key: string]: {
    record: RouteRecordRaw,
    params?: T[typeof key]["params"]
  }
}>(ExtendedRoutes: T) {

  const routes = Object.values(ExtendedRoutes).map(route => route.record)

  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })


  type MakeExtendedRouterArgs<K extends keyof T> = T[K]["params"] extends Record<string, any> ?
    [first: K, second: T[K]["params"]] :
    [first: K, second?: undefined];

  function push<T extends keyof typeof ExtendedRoutes>(
    ...args: MakeExtendedRouterArgs<T>
  ) {
    const [key, params] = args
    console.log(key, params)
    const route = ExtendedRoutes[key || "HomeView"]
    console.log(route.record.name)
    router.replace({ name: route.record.name, params: params as RouteParamsRawGeneric | undefined })
  }

  return {
    push,
    router,
    routes
  }
}



import authAtore from '@/store/authStore'

export default makeExtendedRouter({

  HomeView: {
    record: {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      beforeEnter: (to, from, next) => {
        if (!authAtore.state.token) {
          return next({ name: 'login', params: { goBackRoute: "HomeView" } })
        }

        next()
      }
    }
  },
  LoginView: {
    record: {
      path: '/login/:goBackRoute?',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    params: {
      goBackRoute: null as string | null
    }
  },
  AboutView: {
    record: {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  }

})
