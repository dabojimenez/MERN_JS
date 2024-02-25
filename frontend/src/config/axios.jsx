import axios from 'axios';

// Ceamos una url de base con axios, pasandole el dominio principal por ejemplo
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
});

export default clienteAxios;