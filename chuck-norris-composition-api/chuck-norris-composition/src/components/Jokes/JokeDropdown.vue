<template>
  <select class="form-select" aria-label="Default select example" v-model="selectedCategory" @change="saveToLocal('selectedOption', selectedCategory)">
    <option value="">Open this select menu</option>
    <option v-for="category in categories" :key="category" :value="category">
      {{ category }}
    </option>
  </select>
</template>

<script setup>
import { useJokeStore } from '@/stores/jokeStore.js';
import {computed, onBeforeMount, ref, watch, defineEmits, onMounted} from 'vue';
import saveToLocal from "@/utilities/saveToLocal.js";

  const emit = defineEmits(['update:category']);

  const jokeStore = useJokeStore();
  const selectedCategory = ref('');
  const categories = computed(() => jokeStore.categories);

  onBeforeMount(() => {
    jokeStore.loadCategories();
  });

  onMounted(() => {
    const savedOption = JSON.parse(localStorage.getItem("selectedOption"));
    if (savedOption) {
      selectedCategory.value = savedOption;
    }
  })

  watch(selectedCategory, (newCategory) => {
    emit('update:category', newCategory);
  });

</script>



