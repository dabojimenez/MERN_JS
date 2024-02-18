import mongoose from 'mongoose';
import generarId from '../helpers/generarId.js';

// Definimos el schema, este schema, ocntendra toda la estructrua que tendran los datos del modelo de este caso de Veterinario
// Es un enfoque de Code-First
const veterinarioSchema = mongoose.Schema({
    // el id, automaticamente le asigna el id
    nombre: {
        type: String,
        require: true,
        trim: true, // eliminara automaticamente los espacios en blanco al inicio y al final
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    telefono: {
        type: String,
        default: null, // no sera obligatorio
        trim: true
    },
    web: {
        type: String,
        default: null,
    },
    token: {
        type: String,
        default: generarId,
    },
    confirmado: {
        type: Boolean,
        default: false,
    }
});

// Registramos en mongoose, pasnaodle el nombre con el que se creara y ademas le pasamos el schema/forma que tendran los datos
const Veterinario = mongoose.model('Veterinario', veterinarioSchema);

// exportamos el modelo
export default Veterinario;