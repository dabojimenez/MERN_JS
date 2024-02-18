// En este archivo van todas las rutas que esten relacionadas a veterinario
import express from 'express';
import { autenticar, comprobarToken, confirmar, nuevoPassword, olvidePassword, perfil, registrar } from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

// iniciamos el ruteo
const router = express.Router();

// Rutas para el area publica
router.post('/', registrar);
router.get('/confirmar/:token', confirmar); // con los dos puntos, pasamos un parametro dinámico
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword); // ruta dodne colocara el email

// CODIGO IGUAL AL DE ABAJO EN EL CHANGE, DODNE ESTA EN UAN SOLA URL EL GET Y POST
// router.get('/olvide-password/:token', comprobarToken); // para verirficar el correo
// router.post('/olvide-password/:token', nuevoPassword); // formulario, donde colocara su nueva contrasena

router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);


// Rutas para el area privada

// Para poder proteger ciertas rutas crearemos nuestros propios Middleware. (en la carpeta middleware)
// checkAuth => ya es nuestro propio middleware, el cual se ejecutar aantes de la funcion perfil
router.get('/perfil',checkAuth, perfil);

export default router;