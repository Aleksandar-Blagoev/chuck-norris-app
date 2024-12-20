<template>
  <div v-if="experience">
    <section>
      <h1>
        {{ experience.name }}
      </h1>
      <img :src="`/images/${experience.image}`" :alt="experience.name" />
      <p>
        {{ experience.description }}
      </p>
    </section>
  </div>
</template>


<script setup>
import { useDestination } from '@/composables/useDestination'

const { experience, fetchCountryData } = useDestination()

fetchCountryData()
</script>
