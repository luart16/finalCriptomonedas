<template>
  <div class="compra-form">
    <h2>Nueva Operación de Criptomoneda</h2>
    
    <form @submit.prevent="handleSubmit" class="form">
      <!-- Nuevo select para el tipo de operación -->
      <div class="form-group">
        <label for="operationType">Tipo de Operación:</label>
        <select 
          id="operationType" 
          v-model="form.operationType"
          required
        >
          <option value="purchase">Compra</option>
          <option value="sale">Venta</option>
        </select>
      </div>

      <div class="form-group">
        <label for="crypto">Criptomoneda:</label>
        <select 
          id="crypto" 
          v-model="form.cryptoCode"
          required
        >
          <option value="">Seleccione una criptomoneda</option>
          <option 
            v-for="crypto in store.cryptocurrencies" 
            :key="crypto.code" 
            :value="crypto.code"
          >
            {{ crypto.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="amount">Cantidad:</label>
        <input
          id="amount"
          type="number"
          v-model="form.amount"
          step="0.00000001"
          min="0"
          required
        >
      </div>

      <div class="form-group">
        <label for="datetime">Fecha y Hora:</label>
        <input
          id="datetime"
          type="datetime-local"
          v-model="form.datetime"
          :max="getCurrentDateTime()"
          required
        >
      </div>

      <div class="form-group">
        <label for="money">{{ form.operationType === 'purchase' ? 'Monto a Pagar' : 'Monto a Recibir' }} (ARS):</label>
        <input
          id="money"
          type="number"
          :value="calculatedMoney"
          step="0.01"
          min="0"
          readonly
        >
      </div>

      <div class="error" v-if="error">{{ error }}</div>
      
      <button 
        type="submit" 
        :disabled="loading"
      >
        {{ loading ? 'Procesando...' : form.operationType === 'purchase' ? 'Registrar Compra' : 'Registrar Venta' }}
      </button>
    </form>
  </div>
</template>
  
<script>
import { ref, computed, watch } from 'vue'
import { useNuevaCompraStore } from '../store/NuevaCompraStore'
import axios from 'axios'

export default {
  name: 'NuevaOperacion',

  setup() {
    const store = useNuevaCompraStore()
    const error = ref('')
    const loading = ref(false)

    const form = ref({
      operationType: 'purchase', // Nuevo campo para distinguir entre compra y venta
      cryptoCode: '',
      amount: '',
      datetime: '',
      money: ''
    })

    const cryptoPrices = ref({})

    const cryptoCodeMap = {
      'bitcoin': 'btc',
      'ethereum': 'eth',
      'usdc': 'usdc'
    }

    const fetchCryptoPrice = async (crypto) => {
      if (!crypto) return

      try {
        const cryptoCode = cryptoCodeMap[crypto.toLowerCase()]
        const response = await fetch(`https://criptoya.com/api/satoshitango/${cryptoCode}/ars/1`)
        const data = await response.json()
        
        if (data.totalAsk && data.totalBid) {
          // Guardamos tanto el precio de compra como el de venta
          cryptoPrices.value[crypto] = {
            buy: data.totalAsk,
            sell: data.totalBid
          }
        }
      } catch (e) {
        console.error('Error obteniendo precio:', e)
        error.value = 'Error al obtener el precio de la criptomoneda'
      }
    }

    const calculatedMoney = computed(() => {
      if (form.value.cryptoCode && form.value.amount) {
        const selectedCrypto = form.value.cryptoCode.toLowerCase()
        const prices = cryptoPrices.value[selectedCrypto]
        if (!prices) return '0.00'

        const price = form.value.operationType === 'purchase' ? prices.buy : prices.sell
        const amount = parseFloat(form.value.amount) || 0
        return (amount * price).toFixed(2)
      }
      return '0.00'
    })

    const validateDateTime = (datetime) => {
      const selectedDate = new Date(datetime)
      const now = new Date()
      return selectedDate <= now
    }

    const formatDateTime = (datetime) => {
      const date = new Date(datetime)
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear()
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      
      return `${day}-${month}-${year} ${hours}:${minutes}`
    }

    watch(() => form.value.cryptoCode, (newValue) => {
      if (newValue) {
        fetchCryptoPrice(newValue.toLowerCase())
      }
    })

    // Observar cambios en el tipo de operación para recalcular el monto
    watch(() => form.value.operationType, () => {
      if (form.value.cryptoCode) {
        fetchCryptoPrice(form.value.cryptoCode.toLowerCase())
      }
    })

    const getCurrentDateTime = () => {
      const now = new Date()
      return now.toISOString().slice(0, 16)
    }

    const handleSubmit = async () => {
      try {
        error.value = ''

        // Validaciones
        if (!form.value.cryptoCode) {
          error.value = 'Debe seleccionar una criptomoneda'
          return
        }

        if (!form.value.amount || parseFloat(form.value.amount) <= 0) {
          error.value = 'La cantidad debe ser mayor a 0'
          return
        }

        if (!form.value.datetime) {
          error.value = 'Debe seleccionar una fecha y hora'
          return
        }

        if (!validateDateTime(form.value.datetime)) {
          error.value = 'La fecha no puede ser futura'
          return
        }

        const moneyAmount = parseFloat(calculatedMoney.value)
        if (moneyAmount <= 0) {
          error.value = 'El monto debe ser mayor a 0'
          return
        }

        loading.value = true

        const transactionData = {
          user_id: localStorage.getItem('userId'),
          action: form.value.operationType, // 'purchase' o 'sale'
          crypto_code: form.value.cryptoCode.toLowerCase(),
          crypto_amount: parseFloat(form.value.amount).toString(),
          money: calculatedMoney.value,
          datetime: formatDateTime(form.value.datetime)
        }

        await axios.post(
          'https://laboratorio3-f36a.restdb.io/rest/transactions',
          transactionData,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-apikey': 'tu_api_key_aqui'
            }
          }
        )

        // Limpiar el formulario
        form.value = {
          operationType: 'purchase',
          cryptoCode: '',
          amount: '',
          datetime: '',
          money: ''
        }

      } catch (e) {
        error.value = 'Error al procesar la operación: ' + e.message
      } finally {
        loading.value = false
      }
    }

    return {
      store,
      form,
      error,
      loading,
      calculatedMoney,
      handleSubmit,
      getCurrentDateTime
    }
  }
}
</script>
  
  <style scoped>
  .compra-form {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input, select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #cccccc;
  }
  
  .error {
    color: red;
    margin-bottom: 10px;
  }
  </style>