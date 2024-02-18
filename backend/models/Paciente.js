import mongoose from 'mongoose';

const pacientesSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    propietario: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    fechaAlta: {
        type: Date,
        require: true,
        default: Date.now(),
    },
    sintomas: {
        type: String,
        require: true
    },
    // Agregamos la referencia del Veterinario
    veterinario: {
        type: mongoose.Schema.Types.ObjectId, // colocamos el id de la tabla de referencia
        ref: 'Veterinario' // le colocamos el nombre de la referencia
    }
}, {
    timestamps: true, // para que nos cre las columnas de editado y creado
});

const Paciente = mongoose.model('Paciente', pacientesSchema);

export default Paciente;