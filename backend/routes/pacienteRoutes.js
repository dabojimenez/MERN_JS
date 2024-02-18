import express from 'express';
import { actualizarPaciente, agregarPaciente, eliminarPaciente, obtenerPaciente, obtenerPacientes } from '../controllers/pacienteController.js';
import checkAuth from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/')
    .post(checkAuth, agregarPaciente) // protegemos la ruta
    .get(checkAuth, obtenerPacientes);

router.route('/:id')// le pasmaos el id del paciente
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, actualizarPaciente) // actualizar paciente
    .delete(checkAuth, eliminarPaciente);


export default router;