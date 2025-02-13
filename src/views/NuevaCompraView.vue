<template>
    <div class="nueva-compra">
        <h1>Nueva Compra de Criptomonedas</h1>
        <NuevaCompraComponent />
    </div>
</template>

<script>
import NuevaCompraComponent from '@/components/NuevaCompraComponent.vue'

export default {
    name: 'NuevaCompraView',
    components: {
        NuevaCompraComponent
    }
}
</script>

<style scoped>
.nueva-compra {
    padding: 20px;
}
</style>