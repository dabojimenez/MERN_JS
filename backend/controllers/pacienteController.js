import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res) => {

    const paciente = new Paciente(req.body); // crearemos una instancia con los datos pasados

    paciente.veterinario = req.veterinario._id
    try {
        // gUARDAMOS EN LA BASE DE DATOS
        const pacienteAlmacenado = await paciente.save();
        res.json( pacienteAlmacenado );
    } catch (error) {
        console.log(error);
    }
}

const obtenerPacientes = (req, res) => {

}


export {
    agregarPaciente,
    obtenerPacientes
}