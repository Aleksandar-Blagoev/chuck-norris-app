<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from "@/components/Nav/Navbar.vue";
</script>

<template>
  <div id="app">
    <Navbar />
    <div class="main-content">
      <RouterView />
    </div>
  </div>
</template>


