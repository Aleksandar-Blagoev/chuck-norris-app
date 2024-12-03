<template>
  <select class="form-select" aria-label="Default select example" v-model="selectedCategory" @change="saveToLocalStorage">
    <option disabled value="">Open this select menu</option>
    <option v-for="category in categories" :key="category" :value="category">
      {{ category }}
    </option>
  </select>
</template>

<script setup>
import { useJokeStore } from '@/stores/jokeStore.js';
import { computed, onBeforeMount, ref, watch, defineEmits } from 'vue';

  const emit = defineEmits(['update:category']);

  const jokeStore = useJokeStore();
  const selectedCategory = ref('');
  const categories = computed(() => jokeStore.categories);

  onBeforeMount(() => {
    jokeStore.loadCategories();
  });

  const saveToLocalStorage = () => {
    localStorage.setItem("selectedOption", JSON.stringify(selectedCategory.value));
  }

  watch(selectedCategory, (newCategory) => {
    emit('update:category', newCategory);
  });

</script>



