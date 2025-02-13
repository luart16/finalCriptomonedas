import { defineStore } from 'pinia'
import apiClient from '../Services/axios' 

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: null,
    error: null 
  }),
  
  actions: {
    async validateAndSetUserId(id) {
      try {
        // Validación básica del formato
        if (!/^[a-zA-Z0-9]+$/.test(id)) {
          throw new Error('El ID debe ser alfanumérico')
        }
        
        // Verificar que podemos hacer una consulta con este ID
        await apiClient.get(`/transactions?q={"user_id":"${id}"}`)
        
        this.userId = id
        this.error = null
        return true
      } catch (error) {
        this.error = error.message
        return false
      }
    },
    
    logout() {
      this.userId = null
      this.error = null
    }
  },
  
  persist: true
})