<template>
    {{ authStore.state.token }}
    {{ route.params }}
    <div>
        <button @click="login">Login</button>
    </div>
</template>

<script setup lang="ts">
import extendedRouter from '@/router'
import authStore from '@/store/authStore'
import { useRoute } from 'vue-router'

const route = useRoute()

const login = async () => {

    const goBackRoute = route.params.goBackRoute as string

    if (goBackRoute) {
        // extendedRouter.push(goBackRoute as any)
        extendedRouter.push("HomeView")
    }
}
</script>