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
  .error-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: inherit;
    color: #ffffff;
    font-family: "Arial", sans-serif;
  }

  .error-container {
    text-align: center;
    max-width: 500px;
    padding: 20px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  .error-title {
    font-size: 6rem;
    font-weight: bold;
    margin: 0;
    color: white;
  }

  .error-message {
    font-size: 1.5rem;
    margin: 20px 0;
  }

  .error-button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 1.2rem;
    color: white;
    background-color: #0d6efd;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    transition: transform 0.3s, background-color 0.3s;
  }

  .error-button:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 12px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
  }
</style>

