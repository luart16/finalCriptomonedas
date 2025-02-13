<template>
<div id="app">
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <LoginForm />  <!-- Agrega el componente de Login aquí -->

  <!-- Muestra el ID guardado si existe -->
  <div v-if="userId">
    <p>ID guardado: {{ userId }}</p>
  </div>
</div>
</template>

<script>
import { useUserStore } from './store/userStore'; // Importa el store de Pinia
import LoginForm from './components/LoginComponent.vue'; // Importa el componente Login
export default {
components: {
  LoginForm // Registra el componente Login
},
computed: {
  userId() {
    const userStore = useUserStore();  // Usa el store de Pinia
    return userStore.userId;  // Retorna el ID guardado en el store
  }
}
};
</script>

<style>
</style>