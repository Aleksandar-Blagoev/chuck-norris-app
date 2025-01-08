<template>
  <div id="nav">
    <AppLink id="logo" to="/">Travel App</AppLink>
    <AppLink
      v-for="destination in destinations"
      :key="destination?.id"
      :to="{ name: 'destination.show', params: { id: destination.id, slug: destination.slug } }"
    >
      {{ destination.name }}
    </AppLink>
    <AppLink :to="{ name: 'protected' }">Dashboard</AppLink>
    <AppLink to="https://youtube.com">YouTube</AppLink>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import sourceData from '@/data.json'
import AppLink from '@/components/AppLink.vue'

const destinations = ref(sourceData.destinations)
</script>

<style scoped lang="css">
#nav a.header-active-link {
  opacity: 1;
  border-bottom: 1px solid white;
}
</style>
