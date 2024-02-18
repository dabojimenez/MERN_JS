// En este archivo van todas las rutas que esten relacionadas a veterinario
import express from 'express';

// iniciamos el ruteo
const router = express.Router();

router.get('/', (req, res) => {
    res.send('desde api/veterinarios');
});

router.get('/login', (req, res) => {
    res.send('desde api/veterinarios/login');
});

export default router;