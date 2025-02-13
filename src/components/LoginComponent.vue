<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Iniciar Sesión</h2>
      
      <div class="form-group">
        <label for="userId">ID de Usuario:</label>
        <input 
          type="text" 
          id="userId"
          v-model="userId"
          placeholder="Ingrese su ID"
          required
        />
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <button type="submit" :disabled="!isValidId">
        Ingresar
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '../store/userStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

const userId = ref('')
const error = ref('')

// Validación simple para el ID alfanumérico
const isValidId = computed(() => {
  return /^[a-zA-Z0-9]+$/.test(userId.value)
})


const handleLogin = () => {

const handleLogin = async () => {

  if (!isValidId.value) {
    error.value = 'El ID debe contener solo letras y números'
    return
  }

  try {

    userStore.setUserId(userId.value)
    router.push('/dashboard') // O la ruta que corresponda

    const success = await userStore.validateAndSetUserId(userId.value)
    if (success) {
      router.push('/nueva-compra') 
    } else {
      error.value = userStore.error || 'Error al validar el ID'
    }

  } catch (e) {
    error.value = 'Error al iniciar sesión'
  }
}
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  margin-bottom: 1rem;
}
</style>