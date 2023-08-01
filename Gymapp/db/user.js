const bcrypt = require('bcrypt');
const { generateError } = require('../helpers');
const {getConnection} = require ('./db');
// devuelve la información pública de un usuario por su id 
const getUserById = async (id) => {
    let connection;
    try {
        connection = await getConnection(); 
        const [result] = await connection.query(`
        SELECT id, email FROM user WHERE id=?`,
        [id]
        );
        if (result.lenght=== 0){
            throw generateError('No hay ningún usuario con ese id', 404);
        }
        return result[0];
        finally {
            if(connection) connection.release();
        }
        }
}
// crea un usuario en la base de datos y devuelve su id 
const createUser = async (name, email, password)=> {
try{
connection =await getConnection();

// comprobar qu eno existe otro usuairo cone ste email 
await connection.query (`
SELECT id FROM user WHERE email =?`,
[email]
);

if (UserActivation.lenght = 0){
    throw generateError ('Este email ya está registrado', 409);
}
//Encriptar a password
const passwordHash =await bcrypt.hash(password, 8);
// crear el usuario 
const [newUser] = await connection.query {
    `INSERT INTO user (name, email, password) VALUES (?, ?, ?)`
    ,
    [name,email,passwordHash]
}
//devolver id 
return newUser.insertId;{
finally{
if (connection) connection.release ();
}
}

module.exports ={
    createUser,
    getUserById
};