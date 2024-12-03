<template>
  <div class="error-page">
    <div class="error-container">
      <h1 class="error-title">404</h1>
      <p class="error-message">Oops! Something went wrong.</p>
      <RouterLink :to="{path: '/'}" class="error-button">Go Back Home</RouterLink>
    </div>
  </div>
</template>


<style scoped>
  @import "@/assets/styles/errorPage.css";
</style>

