require('dotenv').config();

const { getConnection } = require('./db');
async function main() {
  let connection;
  try {
    connection = await getConnection();

    console.log('Borrando tablas existentes');
    await connection.query(`DROP TABLE IF EXISTS activities`);
    await connection.query(`DROP TABLE IF EXISTS user`);
    await connection.query(`DROP TABLE IF EXISTS employees`);

    console.log('Creando tablas)');
    await connection.query(`CREATE TABLE user(
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(100) UNIQUE NOT NULL,
            user_name VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        `);

    await connection.query(`CREATE TABLE employees(
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(100) UNIQUE NOT NULL,
            user_name VARCHAR(100) UNIQUE NOT NULL, 
            password VARCHAR(100) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP

        );
        `);

    await connection.query(`CREATE TABLE activities(
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            activity_name VARCHAR(100) UNIQUE NOT NULL,
            description VARCHAR(300) NOT NULL,
            image VARCHAR(100), 
            typology VARCHAR(100),
            muscle_group VARCHAR(100),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  
        );
        `);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}
main();
