<template>
    {{ authStore.state.token }}
    {{ authStore.state.actionError.logIn }}
    {{ route.params }}
    <div>

        <h1>{{ "authStore.state.actionState.logIn" }}</h1>
        <h1>{{ authStore.state.actionState.logIn }}</h1>
        <button @click="login">Login</button>
        <button @click="extendedRouter.push('AboutView')">about</button>
        
        
        <button @click="login">Erro</button>
        <button @click="authStore.teste()">Ok</button>

        <div>
            <div v-for="post in authStore.state.posts" :key="post.id">
                <h1>{{ post.title }}</h1>
                <p>{{ post.body }}</p>
                <p>{{ post.userId }}</p>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import extendedRouter from '@/router'
import authStore from '@/store/authStore'
import { useRoute } from 'vue-router'

const route = useRoute()

const login = async () => {

    authStore.setToken("loggedOff")
    const goBackRoute = route.params.goBackRoute as string


    authStore.logIn().then(() => {
        // if (goBackRoute) {
        //     extendedRouter.push(goBackRoute as any)
        // }
    }).catch((error) => {
        console.log(error)
    })


    // if (goBackRoute) {
    //     extendedRouter.push(goBackRoute as any)
    // }
}
</script>