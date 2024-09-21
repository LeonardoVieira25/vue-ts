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
    const route = ExtendedRoutes[key]
    console.log(route.record.name)
    router.push({ name: route.record.name, params: params as RouteParamsRawGeneric | undefined })
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
      name: 'HomeView',
      component: () => import('../views/HomeView.vue'),
      beforeEnter: (to, from, next) => {
        if (!authAtore.state.token) {
          return next({ name: 'LoginView', params: { goBackRoute: "HomeView" } })
        }

        next()
      }
    }
  },
  LoginView: {
    record: {
      path: '/login/:goBackRoute?',
      name: 'LoginView',
      component: () => import('../views/LoginView.vue')
    },
    params: {
      goBackRoute: null as string | null
    }
  }

})
