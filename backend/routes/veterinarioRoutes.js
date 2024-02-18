// En este archivo van todas las rutas que esten relacionadas a veterinario
import express from 'express';
import { perfil, registrar } from '../controllers/veterinarioController.js';

// iniciamos el ruteo
const router = express.Router();

router.post('/', registrar);

router.get('/perfil', perfil);

export default router;