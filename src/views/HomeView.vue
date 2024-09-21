<template>
  {{ authStore.state.token }}
  <div class="home">
    <button @click="extendedRouter.push('LoginView', {
      goBackRoute: 'HomeView'
    })">Logout</button>
  </div>
</template>




<script setup lang="ts">

import authStore from '@/store/authStore'
import extendedRouter from '@/router'

</script>