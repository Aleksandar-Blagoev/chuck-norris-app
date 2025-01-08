<template>
  <div>
    <h1>Greeting, {{ username }}</h1>
    <button @click="logout">Logout</button>
    <AppLink :to="{ name: 'invoices' }">
      <button>Invoices</button>
    </AppLink>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import AppLink from '@/components/AppLink.vue'

const username = window.user
const router = useRouter()

const logout = () => {
  window.user = null
  router.push({ path: '/' })
}
</script>
