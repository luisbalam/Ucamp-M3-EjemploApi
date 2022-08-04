/ Instanciamos mongoose */
const mongoose = require('mongoose');

/* Conexión con la base */
mongoose.connect('mongodb://localhost:27017/m3');

/* Crear modelo */

const User = mongoose.model('User', {
    firstname: String,
    lastname: String,
}, 'user');

/* Instanciamos un objeto del modelo */

const ramon = new User({
    firstname: 'Ramón',
    lastname: 'Martínez',
})

ramon.save().then(() => console.log('Se guardó el elemento'));
