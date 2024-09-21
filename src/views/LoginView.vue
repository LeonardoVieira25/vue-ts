<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { RoutesQueryProps } from '@/router/index' // Import the type

import { typedStore } from '@/store/index'

const router = useRouter()
const route = useRoute()
const redirect = (route.query as RoutesQueryProps["login"]).redirect || '/'

const login = async () => {
    typedStore.setToken("Eu setei esse token no login")

    router.push(redirect)
}
</script>

<template>
    <div>
        {{ typedStore.state.token }}
        <button @click="login">Login</button>
    </div>
</template>