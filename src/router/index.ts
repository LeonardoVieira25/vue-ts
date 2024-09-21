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


  function push<K extends keyof T>(key: K, params: T[K]["params"]) {
    const route = ExtendedRoutes[key]
    router.push({ name: route.record.name, params: params as RouteParamsRawGeneric | undefined })
  }

  return {
    push,
    router,
    routes
  }
}





export default makeExtendedRouter({
  
  HomeView: {
    record: {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    }
  },
  LoginView: {
    record: {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    params: {
      goBackRoute: null as string | null
    }
  }

})
