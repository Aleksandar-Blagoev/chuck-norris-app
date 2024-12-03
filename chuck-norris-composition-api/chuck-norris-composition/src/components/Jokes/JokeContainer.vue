<template>
  <div>
    <div class="d-flex gap-3">
      <JokeDropdown v-model:category="selectedCategory" />
      <JokeButton :selectedCategory="selectedCategory" />
    </div>
    <div>
      <JokeCard />
    </div>
  </div>
</template>

<script setup>
import JokeDropdown from '@/components/Jokes/JokeDropdown.vue';
import JokeButton from '@/components/Jokes/JokeButton.vue';
import JokeCard from '@/components/Jokes/JokeCard.vue';
import { ref } from 'vue';

const selectedCategory = ref('');
</script>
