import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import extendedRouter from '@/router'




createApp(App)
    .use(extendedRouter.router)
    .mount('#app')


