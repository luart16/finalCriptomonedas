import { defineStore } from 'pinia'
import axios from 'axios'

export const useNuevaCompraStore = defineStore('compra', {
  state: () => ({
    cryptocurrencies: [
      { code: 'bitcoin', name: 'Bitcoin' },
      { code: 'ethereum', name: 'Ethereum' },
      { code: 'usdc', name: 'USD Coin' }
    ],
    loading: false,
    error: null
  }),
  
  actions: {
    async saveCompra(compraData) {
      try {
        this.loading = true
        this.error = null
        
        const response = await axios.post(
          'https://laboratorio3-f36a.restdb.io/rest/transactions',
          {
            user_id: localStorage.getItem('userId'), // Asumiendo que guardamos el userId en localStorage
            action: 'compra',
            crypto_code: compraData.cryptoCode.toLowerCase(),
            crypto_amount: compraData.amount,
            money: compraData.money,
            datetime: compraData.datetime
          }
        )
        
        return response.data
      } catch (error) {
        this.error = 'Error al guardar la compra: ' + error.message
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})