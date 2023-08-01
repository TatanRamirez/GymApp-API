const{generateEror} = require('../helpers');
const {createUser} = require ('../db/user');
const newUserController = async (req, res, next) => {
try {
    const { name, email, password }= req.body;

    console.log(name);
    console.log(email);
    console.log(password);
    console.log(req.body);

    //me queda validar con joi esta aparte, indicándole el mínimo de caracteres de la password
    if (!name || !email || !password){
        throw generateEror('Deber completar un nombre, un mail y una contraseña');
    }
    const id = await createUser(name, email, password);

res.send({
    status: 'ok',
    message: 'User created with id:1'
})
}catch (error){
    next(error);
}
}

const getUserController = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Not implemneted'
        })
        }catch (error){
            next(error);
        }
}

const loginController = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Not implemneted'
        })
        }catch (error){
            next(error);
        }
}

module.exports = {
    newUserController,
    getUserController,
    loginController
};