import axios from 'axios';

const instancia = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3', // Base URL de la API de CoinGecko
  timeout: 5000, // Tiempo de espera de 5 segundos
});

export default instancia;