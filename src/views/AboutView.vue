<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="extendedRouter.push('HomeView')">Home</button>
  </div>
</template>

<script setup lang="ts">
import extendedRouter from '@/router'

</script>