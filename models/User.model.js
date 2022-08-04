/* Instanciamos mongoose */
const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    uniqueValidator = require('mongoose-unique-validator');

/* Creamos nuestro Schema */
const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, default: 'Perez' },
    type: {
        type: String,
        default: 'client',
        enum: [
            'client',
            'admin',
            'cajero',
            'limpieza',
        ]
    },
    numero: {
        type: Number,
        min: [0, 'El mínimo es 0'],
        max: [10, 'El máximo es 10'],
    },
    dob: { type: Date },
    mail: {
        type: String,
        required: [true, 'Se requiere el email'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Email invalido']
    },
    password: { type: String },
    salt: { type: String }
});

UserSchema.plugin(uniqueValidator, { message: 'No se permiten duplicados' });

/* Agregamos método para generar token */
UserSchema.methods.generateJWT = function () {
    return jwt.sign({ idUser: this._id, type: this.type }, process.env.SECRET_JWT);
}

/* Agregamos método para encriptar la contraseña */
UserSchema.methods.hashPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
}

UserSchema.methods.hashedPassword = function (passwordParam) {
    const salt = crypto.randomBytes(16).toString('hex');
    const password = crypto.pbkdf2Sync(passwordParam, salt, 1000, 512, 'sha512').toString('hex');

    return { password, salt }
}

/* Agregamos método para verificar la contraseña */
UserSchema.methods.verifyPassword = function (password) {
    const hashedPassword = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
    return hashedPassword === this.password;
}

mongoose.model('User', UserSchema, 'collectionUser');
