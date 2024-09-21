<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

import authStore from '@/store/auth'

const route = useRoute()

const login = async () => {
    authStore.setToken("Eu setei esse token no login")

}
</script>

<template>
    <div>
        {{ authStore.state.token }}
        <button @click="login">Login</button>
    </div>
</template>