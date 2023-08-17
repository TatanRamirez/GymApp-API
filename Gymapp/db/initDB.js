require('dotenv').config();

const { getConnection } = require('./db');
async function main() {
  let connection;
  try {
    connection = await getConnection();

    console.log('Borrando tablas existentes');
    await connection.query(`DROP TABLE IF EXISTS activities, user, likes`);

    console.log('Creando tablas)');
    await connection.query(`CREATE TABLE user(
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(100) UNIQUE NOT NULL,
            user_name VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            role VARCHAR(100) NOT NULL DEFAULT "client",
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        `);

    await connection.query(`CREATE TABLE activities (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            activity_name VARCHAR(100) UNIQUE NOT NULL,
            description VARCHAR(300) NOT NULL,
            image VARCHAR(100), 
            typology VARCHAR(100) NOT NULL,
            muscle_group VARCHAR(100) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP     
          )
        `);

    connection.query(
      `CREATE TABLE likes (
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL,
            activity_id INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES user(id),
            FOREIGN KEY (activity_id) REFERENCES activities(id)
          )`
    );

    // GRANT INSERT ON activities TO  administrador;

    // GRANTS DELETE ON activities TO administrador;

    //  INSERT INTO activities (id , activity_name, description, image, typology, muscle_group, created_ad);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}
main();
