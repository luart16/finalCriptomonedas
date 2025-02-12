<template>
  <div class="login-view">
    <h1>Sistema de Cartera de Criptomonedas</h1>
    <LoginComponent />
  </div>
</template>

<script setup>
import LoginComponent from '../components/LoginComponent.vue'
import { useUserStore } from '../store/userStore'

const userStore = useUserStore()
</script>

<style scoped>
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
}

h1 {
  margin-bottom: 2rem;
  color: #2c3e50;
  text-align: center;
  font-size: 2rem;
}
</style>