
const checkAuth = (req, res, next) => {
    // obtenemos los headers (req.headers.) y la autorizacions eria la siguiente (req.headers.authorization)
    
    //       TOKEN
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDE2Y2FjOTY1OWY0ZmY3ZjNlNTFiOSIsImlhdCI6MTcwODIyNTkxNCwiZXhwIjoxNzEwODE3OTE0fQ.ThGUYb3kXt_eLCSHrPtcb3TVWypLPSiY2pbo_ZZutog
    // como puden notar se coloca por defecto la palabra Bearer, que es la convencion, y verificaremos con  (startsWith('Bearer')) que se enceuntre la palabra 'Bearer' para amyor seguridad
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        console.log('si tiene el token con beader');
    }
    

    const error = new Error('Token no valido o inexistente');
    res.status(403).json({msg : error.message})

    next();
}

export default checkAuth