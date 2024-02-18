// En este archivo van todas las rutas que esten relacionadas a veterinario
import express from 'express';
import { confirmar, perfil, registrar } from '../controllers/veterinarioController.js';

// iniciamos el ruteo
const router = express.Router();

router.post('/', registrar);

router.get('/perfil', perfil);

router.get('/confirmar/:token', confirmar); // con los dos puntos, pasamos un parametro dinámico

export default router;