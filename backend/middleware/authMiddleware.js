import jwt from 'jsonwebtoken';
import Veterinario from '../models/Veterinario.js';

const checkAuth = async (req, res, next) => {

    let token;
    // obtenemos los headers (req.headers.) y la autorizacions eria la siguiente (req.headers.authorization)

    //       TOKEN
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDE2Y2FjOTY1OWY0ZmY3ZjNlNTFiOSIsImlhdCI6MTcwODIyNTkxNCwiZXhwIjoxNzEwODE3OTE0fQ.ThGUYb3kXt_eLCSHrPtcb3TVWypLPSiY2pbo_ZZutog
    // como puden notar se coloca por defecto la palabra Bearer, que es la convencion, y verificaremos con  (startsWith('Bearer')) que se enceuntre la palabra 'Bearer' para amyor seguridad
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // separaremos por el espacio a bearer y el token, y como el token va a estar en el srgundo lugar obtenemso con [1]
            token = req.headers.authorization.split(' ')[1];

            // Acceso a los datos, en este caso al id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Bucar por el id, obtenido del token
            // req.veterinario => crea una sesión con la ifnromación del veterinario
            req.veterinario = await Veterinario.findById(decoded.id)
                .select("-password -token -confirmado"); // obtendremos el objeto menos (-) lo que se le define

            return next();
        } catch (error) {
            const e = new Error('Token no valido');
            return res.status(403).json({ msg: e.message })
        }
    }

    // si no hay un toke valido, reotrnaremos el siguiente mensaje
    if (!token) {
        const error = new Error('Token no valido o inexistente');
        res.status(403).json({ msg: error.message })
    }

    next();
}

export default checkAuth