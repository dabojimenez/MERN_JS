import express from "express";
import conectarDB from "./config/db.js";
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js';
import cors from 'cors';


import dotenv from 'dotenv';
dotenv.config(); // escaneara y buscara el archivo .env

const app = express();
// Habilitamos la lectura de datos del body
app.use(express.json());// aqui definimos que le vamos a enviar datos de tipo json

// iniciamos la conexion d ela base de datos
conectarDB();

// Implementando los CORS
const dominiosPermitidos = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function (origin, callback) {
        // si la url que esta realizando lapeticion a la API, esta dentro de dominios permitidos, le permitiremos el request
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            // El origen del request esta permitido
            callback(null, true); // null, seria el error
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

// Indicmaos a EXPRESS que usarmeos las configuraciones/opciones de CORS
app.use(cors(corsOptions));
// para manejar las rutas/routing
app.use('/api/veterinarios', veterinarioRoutes);
// para manejar las rutas de pacientes
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log('servidor funcioando en el puerto 4000');
});