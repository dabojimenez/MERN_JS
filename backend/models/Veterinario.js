import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
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

// con mongoose tenemso accesos a ciertos hooks, que si genero un nuevo registro podre realizar acciones antes o despues que se guardo el registro
// Antes de almacenar el registro lo hashearemos
// pre => antes de 
// post => despues de
veterinarioSchema.pre('save', async function (next) {
    // verificamos que si el password ya esta hasheado ya no se lo hashe
    if (!this.isModified('password')) {
        next(); // se va al siguiente middleware
    }
    const salt = await bcrypt.genSalt(10); // salt, es las rondas de haseheo si se le pone mas de 10 que es por defecto, se consume mas recursos
    // detenemos la generacion del hash
    this.password = await bcrypt.hashSync(this.password, salt);
}); // antes de almacenarlo en la BD



// Registramos en mongoose, pasnaodle el nombre con el que se creara y ademas le pasamos el schema/forma que tendran los datos
const Veterinario = mongoose.model('Veterinario', veterinarioSchema);

// exportamos el modelo
export default Veterinario;