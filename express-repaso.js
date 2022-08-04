require('dotenv').config()

/* 1.- Instanciar express */
const express = require('express');
/* 2.- Iniciar express */
const app = express();
/* 3.- Agregar Middlewares */
app.use(express.json());
/* 4.- Definir las rutas */
const funcion = (req, res) => {
    res.json({
        mensaje: 'Se agregó el elemento'
    })
}

app.post('/', funcion);
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Se obtuvo el elemento'
    })
});
app.put('/', (req, res) => {
    res.json({
        mensaje: 'Se actualizó el elemento'
    })
});
app.delete('/', (req, res) => {
    res.json({
        mensaje: 'Se eliminó el elemento'
    })
});
/* 5.- Iniciar servidor */
app.listen(process.env.PORT, () => {
    console.log('Se inició el servidor en el puerto ' + process.env.PORT);
})
