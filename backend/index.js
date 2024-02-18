import express from "express";

const app = express();

// para manejar las rutas/routing
app.use('/', (req, res) => {
    res.send('Hola mudno');
})

app.listen(4000, () => {
    console.log('servidor funcioando en el puerto 4000');
});