<template>
  <header>
    <div class="wrapper">
      <TheNavigation></TheNavigation>
    </div>
  </header>
  <div class="container">
    <router-view class="view left-sidebar" name="LeftSidebar"></router-view>
    <RouterView v-slot="{ Component }" class="main-view">
      <Transition :name="shouldTransition ? 'fade' : null" mode="out-in">
        <Component :is="Component" :key="route.params.id" />
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

const shouldTransition = computed(() => {
  return route.name !== 'experience.show'
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.container {
  display: flex;
}

.main-view {
  width: 100%;
}
</style>
