const jwt = require('jsonwebtoken');
const secret = 'jfasoñfna9pyn98rn89nfc4j8fn489fcn9'

const generarJWT = ()=>{
    return jwt.sign({
        info1: 'Mi info',
        info2: 'Mi otra info',
    }, secret)
}

console.log(generarJWT())

const verificarJWT = (token) => {
    return jwt.verify(token, secret)
}

console.log(verificarJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvMSI6Ik1pIGluZm8iLCJpbmZvMiI6Ik1pIG90cmEgaW5mbyIsImlhdCI6MTYzOTIzOTk3Nn0.5iH3XNCuki7ObgI1DiXcmm5-3HELv3qW1PlBpwHZRnI'));