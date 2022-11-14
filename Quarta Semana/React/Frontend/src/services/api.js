import axios from 'axios';

// criando uma instância do axios
const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api;