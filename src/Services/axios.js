import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://labor3-d60e.restdb.io/rest/', 
  timeout: 5000, // Tiempo de espera de 5 segundos
  headers: {'x-apikey': '64a2e9bc86d8c525a3ed8f63'}
});


export default apiClient;