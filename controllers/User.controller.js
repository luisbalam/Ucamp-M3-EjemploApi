const mongoose = require('mongoose'),
    User = mongoose.model('User')
/* const User = require('mongoose').model('User'); */

const signup = async (req, res) => {
    try {
        // Creamos una instancia de USUARIO
        const user = new User(req.body);

        //Encriptar contraseña
        user.hashPassword(req.body.password)

        // Guardamos al USUARIO
        const resp = await user.save();

        return res.status(200).json({
            menssage: 'User created successfully',
            detail: resp.generateJWT()
        })
    } catch (e) {
        return res.status(400).json({
            menssage: 'Error',
            detail: e.message
        })
    }
}

const login = async (req, res) => {
    try {
        // Con desestructuración obtenemos los datos del body
        const { mail, password } = req.body;

        //Buscamos un usuario por su mail
        const resp = await User.findOne({ mail });

        // Si no lo encuentra a ningun usuario resp = null
        // Si lo encuentra resp = registro en mongo

        // Negamos la respuesta para que entre en el if si no encuentra el elemento
        if (!resp) {
            return res.status(404).json({
                message: 'Error',
                detail: 'Usuario no encontrado'
            })
        }

        // Verificamos que la contraseña del body sea la misma que la de mongo
        if (resp.verifyPassword(password)) {
            return res.status(200).json({
                message: 'Ok',
                detail: resp.generateJWT()
            })
        }

        // Si las contraseñas no coinciden, regresar error
        return res.status(400).json({
            message: 'Error',
            detail: 'Password Incorrecto!'
        })

    } catch (e) {
        return res.status(400).json({
            message: 'Error en el catch',
            detail: e.message
        })
    }

}

const getUsers = async (req, res) => {
    if (req?.user?.type === 'client') {
        return res.json({
            menssage: 'Error',
            detail: 'Sólo los admins pueden hacer esto.'
        })
    }
    try {
        const resp = await User.find();

        if (resp.length === 0) {
            return res.json({
                menssage: 'Error',
                detail: 'No hay registros'
            })
        } else {
            return res.json({
                menssage: 'USers',
                detail: resp
            })
        }
    } catch (e) {
        return res.json({
            menssage: 'Error',
            detail: e.message
        })
    }
}
const updateUser = async (req, res) => {
    try {
        const newData = req.body;

        const resp = await User.findByIdAndUpdate(
            newData.userId,
            { $set: newData },
            { new: true }
        )

        return res.json({
            menssage: 'User updated successfully',
            detail: resp
        })
    } catch (e) {
        return res.json({
            menssage: 'Error',
            detail: e.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const resp = await User.findByIdAndDelete(req.params.id)

        return res.json({
            menssage: 'User deleted successfully',
            detail: resp
        })
    } catch (e) {
        return res.json({
            menssage: 'Error',
            detail: e.message
        })
    }
}

const getInfo = async (req, res) => {
    try {
        //! Obtenemos en ID del token
        // en la proyección, ponemos 1 a lo que queremos mostrar y 0 a lo que queremos ocultar
        const resp = await User.findById(req.user.idUser, { firstname: 1, _id: 0, lastname: 1 });
        return res.json({
            menssage: 'User',
            detail: resp
        })
    } catch (e) {
        return res.json({
            menssage: 'Error',
            detail: e.message
        })
    }
}

const changePasssword = async (req, res) => {
    /**
     * 1.- Verificar la contraseña anterior
     * 2.- Pido las nuevas contraseñas
     * 3.- Encripto la nueva contraseñas
     * 4.- Actualizo el registro
     */
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(req.user.idUser);

        // 1.- Verificar la contraseña anterior
        if (!user.verifyPassword(oldPassword)) {
            return res.status(400).json({
                message: 'Error',
                detail: 'Contraseña incorrecta'
            })
        }

        // 3.- Encripto la nueva contraseña
        const { password, salt } = user.hashedPassword(newPassword);

        const resp = await User.findByIdAndUpdate(
            req.user.idUser,
            { $set: { password, salt } },
            { new: true }
        )

        return res.json({
            menssage: 'Contraseña actualizada',
            detail: resp
        })
    } catch (e) {
        return res.json({
            menssage: 'Error',
            detail: e.message
        })
    }
}

module.exports = {
    signup,
    getUsers,
    updateUser,
    deleteUser,
    getInfo,
    changePasssword,
    login
}
