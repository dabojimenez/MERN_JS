import Veterinario from "../models/Veterinario.js";

const registrar = async (req, res) => {
    // Obtener los datos del body, o información de un formulario
    // IMPORTANTE, HABILITAR LA LECTURA DE DATOS EN EL index.js, el que es de raiz
    const { email, password } = req.body;

    // Revisar si un usuario ya existe por medio de su email
    // findOne, nos va permitir buscar por los diferentes atributod existentes en la base de datos
    const existeUsuario = await Veterinario.findOne({email : email});

    if (existeUsuario) {
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ msg: error.message}); // detenemos la ejecución, cambiamos el tipo de respuesta a 400 y enviamso o devolvemos un mensaje
    }


    try {
        // Guardar un nuevo veterinario
        const veterinario = new Veterinario(req.body); // Le pasamso todo el objeto que recibimos y solo hara match con los campos que tengamos definido en el modelo

        const veterinarioGuardado = await veterinario.save(); // save, es util si vamos a guardar en la base de datos o si tenemos un objeto, lo modificamso y despues lo guardamos

        // si todo fue correcto, mostraremos el siguiente mensaje o el veterinario creado
        // res.json({msg: 'registrando usuario'});
        res.json({veterinarioGuardado});
    } catch (error) {
        console.log(error);
    }
};

const perfil = (req, res) => {
    res.json({msg: 'mostrando perfil'});
};

const confirmar = async (req, res) => {
    const { token } = req.params;

    const usuarioConfirmar = await Veterinario.findOne({token});
    if (!usuarioConfirmar) {
        const error = new Error('Token no valido');
        return res.status(400).json({msj : error.message});
    }

    try {
        // Como ya tenemos la isntancia de ese usuario, cambiaremos el token a null
        usuarioConfirmar.token = null;
        // cambiamos el valor de confirmado a true
        usuarioConfirmar.confirmado = true;
        // guardamos en la base de datos la isntancia modifcada
        await usuarioConfirmar.save();  
        res.json({msg : 'Usuario confirmado correctamente'});
    } catch (error) {
        console.log(error);
    }
}

export {
    registrar,
    perfil,
    confirmar
}