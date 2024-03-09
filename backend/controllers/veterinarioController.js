import emailOlvidePassword from "../helpers/emailOlvidePassword.js";
import emailRegistro from "../helpers/emailRegistro.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import Veterinario from "../models/Veterinario.js";

const registrar = async (req, res) => {
    // Obtener los datos del body, o información de un formulario
    // IMPORTANTE, HABILITAR LA LECTURA DE DATOS EN EL index.js, el que es de raiz
    const { email, nombre } = req.body;

    // Revisar si un usuario ya existe por medio de su email
    // findOne, nos va permitir buscar por los diferentes atributod existentes en la base de datos
    const existeUsuario = await Veterinario.findOne({ email: email });

    if (existeUsuario) {
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ msg: error.message }); // detenemos la ejecución, cambiamos el tipo de respuesta a 400 y enviamso o devolvemos un mensaje
    }


    try {
        // Guardar un nuevo veterinario
        const veterinario = new Veterinario(req.body); // Le pasamso todo el objeto que recibimos y solo hara match con los campos que tengamos definido en el modelo

        const veterinarioGuardado = await veterinario.save(); // save, es util si vamos a guardar en la base de datos o si tenemos un objeto, lo modificamso y despues lo guardamos

        // Si ya todo fue correcto y no entro en el catch, procedmeos a enviar el email
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        });

        // si todo fue correcto, mostraremos el siguiente mensaje o el veterinario creado
        // res.json({msg: 'registrando usuario'});
        res.json({ veterinarioGuardado });
    } catch (error) {
        console.log(error);
    }
};

const perfil = (req, res) => {
    // como ya obtenemso del token los datos y que fueron consumidos en el middleware a la base de datos (accedemos a la sesión que se creo)
    const { veterinario } = req;
    res.json({ veterinario });
};

const confirmar = async (req, res) => {
    const { token } = req.params;

    const usuarioConfirmar = await Veterinario.findOne({ token });
    if (!usuarioConfirmar) {
        const error = new Error('Token no válido');
        return res.status(400).json({ msg: error.message });
    }

    try {
        // Como ya tenemos la isntancia de ese usuario, cambiaremos el token a null
        usuarioConfirmar.token = null;
        // cambiamos el valor de confirmado a true
        usuarioConfirmar.confirmado = true;
        // guardamos en la base de datos la isntancia modifcada
        await usuarioConfirmar.save();
        res.json({ msg: 'Usuario confirmado correctamente' });
    } catch (error) {
        console.log(error);
    }
}

const autenticar = async (req, res) => {
    const { email, password } = req.body;
    // Comprobar si el usuario existe
    const usuario = await Veterinario.findOne({ email });

    if (!usuario) {
        const error = new Error('El usuario no existe');
        // Le retornamos un Forbidden (403) o un Unauthorized (401)
        return res.status(403).json({ msg: error.message });
    }

    // Comprobar si el usuario esta confirmado
    if (!usuario.confirmado) {
        const error = new Error('Cuenta sin confirmar');
        return res.status(403).json({ msg: error.message });
    }

    // Revisar el apssword
    if ( await usuario.comprobarPassword(password)) {
        // Autenticar al usuario con JWT
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id),
        });
    } else {
        const error = new Error('Password incorrecto');
        return res.status(403).json({ msg: error.message });
    }
}

const olvidePassword = async (req, res) => {
    // extraemos el email
    const { email } = req.body;

    const existeVeterinario = await Veterinario.findOne({email});

    // si no existe enviaremos el sigueinte mensaje
    if (!existeVeterinario) {
        const error = new Error('El Usuario no existe');
        return res.status(403).json({ msg: error.message }); 
    }

    // Como si existe el usuario, crearemos un token
    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();

        // Enviar email con instrucciones
        emailOlvidePassword({
            email, 
            nombre: existeVeterinario.nombre,
            token: existeVeterinario.token
        })
        return res.json({ msg: 'Hemos enviado un email con las instrucciones' });
    } catch (error) {
        console.log(error);
    }
}
const comprobarToken = async(req, res) => {
    const { token } = req.params;
    // buscamos que usuario tiene el token
    const tokenValido = await Veterinario.findOne({token});
    if (tokenValido) {
        // El token es valido, el usuario existe
        res.json({ msg : 'Token valido y el usuario existe'})
    }else{
        const error = new Error('Token no valido');
        return res.status(400).json({ msg: error.message });
    }
}
const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body; // El nuevo password que el usuario enviara

    const veterinario = await Veterinario.findOne({token})

    // si no existe el usuario se msotrara el mensaje
    if (!veterinario) {
        const error = new Error('Hubo un error');
        return res.status(400).json({ msg: error.message });
    }

    try {
        // Eliminamos el token anterior
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({ msg : 'Password modificado correctamente'});
    } catch (error) {
        console.log(error);
    }
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}