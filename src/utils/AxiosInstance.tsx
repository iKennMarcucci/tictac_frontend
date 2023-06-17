import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:8081',
    baseURL: 'https://tictacbackend-production.up.railway.app', // Ruta base de tu API
    headers: {
        // Opciones de encabezado comunes, si es necesario
        'Content-Type': 'application/json',
        // Otros encabezados comunes...
    },
});

export default instance;
