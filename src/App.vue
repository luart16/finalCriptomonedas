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
import LoginForm from './components/LoginForm.vue'; // Importa el componente Login


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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

