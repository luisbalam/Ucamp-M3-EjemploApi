/* Instanciamos mongoose */
const mongoose = require('mongoose');

/* Creamos nuestro Schema */
const CategorySchema = new mongoose.Schema({
    name: String
});

mongoose.model('Category', CategorySchema, 'collectionCategory');