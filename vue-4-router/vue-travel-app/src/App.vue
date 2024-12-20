<!--<script setup>-->
<!--import { RouterView } from 'vue-router'-->
<!--import TheNavigation from '@/components/TheNavigation.vue'-->
<!--</script>-->

<!--<template>-->
<!--  <header>-->
<!--    <div class="wrapper">-->
<!--      <TheNavigation></TheNavigation>-->
<!--    </div>-->
<!--  </header>-->

<!--  <div class="container">-->
<!--    <RouterView v-slot="{ Component }">-->
<!--      <Transition v-if="$route.name !== 'experience.show'" name="fade" mode="out-in">-->
<!--        <Component :is="Component" :key="$route.path"> </Component>-->
<!--      </Transition>-->
<!--      <Component v-else :is="Component" :key="$route.path"></Component>-->
<!--    </RouterView>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--.fade-enter-active,-->
<!--.fade-leave-active {-->
<!--  transition: opacity 0.4s;-->
<!--}-->

<!--.fade-enter-from,-->
<!--.fade-leave-to {-->
<!--  opacity: 0;-->
<!--}-->
<!--</style>-->

<template>
  <header>
    <div class="wrapper">
      <TheNavigation></TheNavigation>
    </div>
  </header>
  <div class="container">
    <RouterView v-slot="{ Component }">
      <Transition :name="shouldTransition ? 'fade' : null" mode="out-in">
        <Component :is="Component" :key="$route.path" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TheNavigation from '@/components/TheNavigation.vue'

const route = useRoute()

// Compute whether the transition should be applied
const shouldTransition = computed(() => {
  return route.name !== 'experience.show'
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
