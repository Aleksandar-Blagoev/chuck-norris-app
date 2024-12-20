<template>
  <div id="nav">
    <router-link id="logo" to="/">Travel App</router-link>
    <router-link
      v-for="destination in destinations"
      :key="destination?.id"
      :to="{name: 'destination.show', params: {id: destination.id, slug: destination.slug}}"
    >
      {{destination.name}}
    </router-link>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import sourceData from '@/data.json'

const destinations = ref(sourceData.destinations);
</script>

<style scoped lang="css">
  #nav a.header-active-link {
    opacity: 1;
    border-bottom: 1px solid white;
  }
</style>
