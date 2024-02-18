import express from "express";
import conectarDB from "./config/db.js";
import dotenv from 'dotenv';
dotenv.config(); // escaneara y buscara el archivo .env

const app = express();

// iniciamos la conexion d ela base de datos
conectarDB();

// para manejar las rutas/routing
app.use('/', (req, res) => {
    res.send('Hola mudno');
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log('servidor funcioando en el puerto 4000');
});