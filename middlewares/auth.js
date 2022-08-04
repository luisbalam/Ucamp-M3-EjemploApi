const jwt = require('express-jwt'),
    secret = process.env.SECRET_JWT;

//Secret, método de encriptación, nombre del campo, función que retorne el token
const auth = jwt({
    secret: secret,
    algorithms: ['HS256'],
    userProperty: 'user',
    getToken: function (req) {
        let { authorization } = req.headers;

        if (authorization) {
            //Regresar el token
            // Bearer asfasdf.asfasdf.asdfasd
            // Token asfasdf.asfasdf.asdfasd
            const [type, token] = authorization.split(' ');
            return type === 'Bearer' || type === 'Token' ? token : null;
        }
        return null
    }
});

module.exports = auth;