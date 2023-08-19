const { selectUserById } = require ("../db/user");
const { generateError } = requite ("../helpers");

const isAdmin = async (req, res, next) => {
try {
    const loggerdUser = await selectUserById(req.auth.id);

if (loggerdUser.role !== "admin"){
    generateError("Necesitas un administrador para poder borrar un usuario hacer una modificación en las actividades", 403);
}
next ();
} catch (error) {
    next(error); 
}
};

module.exports = isAdmin; 
