<template>
  <div class="home">
    <h1>All Destinations</h1>
<!--    <button @click="triggerRouterError">TRIGGER ROUTER ERROR</button>-->
    <div class="destinations">
      <AppLink
        v-for="destination in destinations"
        :key="destination?.id"
        :to="{ name: 'destination.show', params: { id: destination.id, slug: destination.slug } }"
      >
        <h2>{{ destination.name }}</h2>
        <img :src="`/images/${destination?.image}`" :alt="destination?.name" />
      </AppLink>
    </div>
  </div>
</template>

<script setup>
import sourceData from '@/data.json'
import { ref } from 'vue'
import AppLink from '@/components/AppLink.vue'
// import { isNavigationFailure, NavigationFailureType, useRouter } from 'vue-router'

const destinations = ref(sourceData.destinations)
// const router = useRouter()

// const triggerRouterError = async () => {
//   const navigationFailure = await router.push('/')
//   if(isNavigationFailure(navigationFailure, NavigationFailureType.duplicated)) {
//     console.log(navigationFailure.to)
//     console.log(navigationFailure.from)
//   } else {
//
//   }
// }
</script>
