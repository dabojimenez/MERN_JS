// En este archivo van todas las rutas que esten relacionadas a veterinario
import express from 'express';
import { autenticar, confirmar, perfil, registrar } from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

// iniciamos el ruteo
const router = express.Router();

// Rutas para el area publica
router.post('/', registrar);
router.get('/confirmar/:token', confirmar); // con los dos puntos, pasamos un parametro dinámico
router.post('/login', autenticar);

// Rutas para el area privada

// Para poder proteger ciertas rutas crearemos nuestros propios Middleware. (en la carpeta middleware)
// checkAuth => ya es nuestro propio middleware, el cual se ejecutar aantes de la funcion perfil
router.get('/perfil',checkAuth, perfil);

export default router;