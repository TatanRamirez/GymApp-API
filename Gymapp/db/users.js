const { generateError } = require('../helpers');
const { getConnection } = require('./db');

//Devuelve la información de un usuario por su id
const getUserById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
    SELECT id, email, created_at FROM users WHERE id=?
    `,
      [id]
    );

    if (result.length === 0) {
      throw generateError('No hay ningun usuario con esa id', 404);
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  getUserById,
};
