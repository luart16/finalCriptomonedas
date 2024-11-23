<template>
  <div>
    <h1>Bienvenido</h1>
    <p>Tu ID de usuario es: {{ userId }}</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      userId: localStorage.getItem('user_id') || 'No registrado'
    };
  }
};
</script>
