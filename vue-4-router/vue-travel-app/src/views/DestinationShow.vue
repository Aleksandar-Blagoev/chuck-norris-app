<template>
  <div>
    <div v-if="destination">
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
          <router-link
            v-for="experience in destination.experiences"
            :key="experience.slug"
            :to="{ name: 'experience.show', params: { experienceSlug: experience.slug } }"
          >
            <ExperienceCard :experience="experience" />
          </router-link>
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
import { RouterLink } from 'vue-router'
import ExperienceCard from '@/components/ExperienceCard.vue'
import GoBack from '@/components/GoBack.vue'
import {useDestination} from '@/composables/useDestination'

const {destination, fetchCountryData} = useDestination()

fetchCountryData()
</script>
