import jwt from 'jsonwebtoken';

const generarJWT = (id) => {
    // retornamos la creacion del token
    return jwt.sign({
        // objeto que se ira en el payload, del token
        id,
    }, process.env.JWT_SECRET, {
        expiresIn: '30d', // colocamos el tiempo de expiración (30 días)
    });
};

export default generarJWT;