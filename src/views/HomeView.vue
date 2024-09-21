<template>
  <div class="home">
    {{ authStore.state.token }}
    <button @click="extendedRouter.push('LoginView', {
      goBackRoute: 'HomeView'
    })">Logout</button>
  </div>
</template>




<script setup lang="ts">

import authStore from '@/store/auth'
import extendedRouter from '@/router'

</script>