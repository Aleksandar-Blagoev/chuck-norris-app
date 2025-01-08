<template>
  <div>
    <div v-if="isNewDestination">
      <section>
        <div>
          <h1>{{ destination.name }}</h1>
          <GoBack />
          <div class="destination-details">
            <img :src="`/images/${destination.image}`" :alt="destination.name" />
            <p>{{ destination.description }}</p>
          </div>
        </div>
      </section>

      <section class="experiences">
        <h2>Top Expriences in {{ destination.name }}</h2>
        <div class="cards">
          <AppLink
            v-for="experience in destination.experiences"
            :key="experience.slug"
            :to="{ name: 'experience.show', params: { experienceSlug: experience.slug } }"
          >
            <ExperienceCard :experience="experience" />
          </AppLink>
        </div>
        <router-view />
      </section>
    </div>
    <div v-else>
      <p>Loading destination data...</p>
    </div>
  </div>
</template>

<script setup>
import ExperienceCard from '@/components/ExperienceCard.vue'
import GoBack from '@/components/GoBack.vue'
import { useDestination } from '@/composables/useDestination'
import AppLink from '@/components/AppLink.vue'
import { ref, watch } from 'vue'

const { destination, fetchCountryData } = useDestination()
console.log('Route ----dasdsaasda-')

const isNewDestination = ref(false)

watch(
  destination,
  (newDestination, oldDestination) => {
    if (newDestination && newDestination !== oldDestination) {
      isNewDestination.value = true
    } else {
      isNewDestination.value = false
    }
  },
  { deep: true }
)

fetchCountryData();
</script>

