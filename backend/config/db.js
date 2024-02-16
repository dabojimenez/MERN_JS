import mongoose from 'mongoose';


const conectarDB = async () => {
    try {
        // le pasamos el string de conexion y tambien el objeto de conexión.
        // IMPORTANTE, EL OBJETO CAMBIA SEGUIDO
        // https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options (para el caso del objeto)
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // obtendrmeos una url con el puerto donde se esta conectando
        const url = `${db.connection.host}:${db.connection.port}`;
        console.log('mongodb conectado en ' + url);
    } catch (error) {
        console.log(`error bd: ${error.message}`);
        process.exit(1); // con este codigo nos imprimira un mensaje de error
    }
}

export default conectarDB;