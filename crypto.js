const crypto = require('crypto');
const salt = 'afn43f9hn43f';

const encriptar = (password) =>{
    // password => elemento a encriptar
    // salt => palabra secreta para encriptar
    // iteracionwa => Las veces que se encripta
    // Tamaño del encriptado
    // método de encriptación
    return crypto.pbkdf2Sync(password, salt, 1000, 512, 'sha512').toString('hex')
}

console.log(encriptar('contraseñaasdfasfasf'));

const verificar = (password) =>{
    // Verificamos encriptando la contraseña y comparandola con la otra contraseña encriptada
    const passHashed = crypto.pbkdf2Sync(password, salt, 1000, 512, 'sha512').toString('hex');

    return passHashed === '7026ae53e3bbf3951abd4ae412678a76c11c67f351eeabb275fb446346cb4794f55c317df29036e59d77219cf431d11ab6b98bed3620a6d62395076df90e3b19218db1f019a9c39e30f660d48d6fcb85aa1d312812402452912e76e4ee7d53bb5b1ed0ffdb7b70d1968f93db86c27c29027ca5bae64359cf167a363a6bc12cb3369281dd6a8f7377920bef5ed4404fa162a8af14eecd098e9a67b94187630165873e934f12bd2662e9b9c7b4a8d94b4b1a374aaad94bb4736cf47d0c6ababa0bcff4cd2161396af8839d4bd2ec549ea58aed19a946eca8ebd95fd21e4019f11e6bc0672099912c7485e7827b5ce0bfc989bcf0df5640c6a0cd357de427ff88d9e76bca4d399b9c610a593fcdd3c4c9da34224695f93ec7ffac9210a3c816813e6fc9d7dc34008b36a3737523b454d5107ef5fd444edb8ac8acd8551c070cc548545d5f47c044e314b92896f78afce1e06cd503b7a2ec138260c066f2ec8c84ed70793941d7da1a6d0ab9e6e87802e0a1a903881d476ec9260c87f3b31035ea3eb2e1e6e0ced259ad2573e768fc718b739f6a76bbe1334ec47df480faa9ac48470e63e0616c7e337ce24734d2faadf9bdcf67dc13733badeb8a26cad8d4fe71ed68fd1777b4632430448a6ecf6c39dca1e9a7de30e3669d9e912b2f344b4b6a038aea26247571f1de48ab06fdf235fbac566190813b1c88ebc133466f56a5df2d'
}

console.log(verificar('contraseñaasdfasfasf'));

console.log('============')

console.log(crypto.randomBytes(16).toString('hex'));