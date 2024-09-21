<template>
    {{ authStore.state.token }}
    {{ route.params }}
    <div>
        <button @click="login">Login</button>
        <button @click="extendedRouter.push('AboutView')">about</button>
    </div>
</template>

<script setup lang="ts">
import extendedRouter from '@/router'
import authStore from '@/store/authStore'
import { useRoute } from 'vue-router'

const route = useRoute()

const login = async () => {

    authStore.setToken("token")
    const goBackRoute = route.params.goBackRoute as string

    if (goBackRoute) {
        extendedRouter.push(goBackRoute as any)
    }
}
</script>