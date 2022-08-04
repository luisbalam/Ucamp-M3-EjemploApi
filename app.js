/* 1.- Importar variables de entorno */
require('dotenv').config()

/* 2.- Importar modelos */
require('./models');

/* 3.- Instanciar Express & Mongoose */
const express = require('express'),
    mongoose = require('mongoose'),
    routes = require('./routes'),
    cors = require('cors');

/* 4.- Inicializamos Express */
const app = express();

/* 5.- Middlewares */
app.use(cors());
app.use(express.json());

/* 6.- Conexión con la base de datos */
mongoose.connect(process.env.MONGO_URI);

/* 7.- Definir rutas */
app.use('/v1', routes);

/* 8.- Iniciar el servidor */
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en ' + process.env.PORT);
});