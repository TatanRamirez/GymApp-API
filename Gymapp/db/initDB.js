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
            role ENUM("client", "administrator") DEFAULT "normal" NOT NULL DEFAULT "client",
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

  /*INSERT INTO user(email, user_name, password, role) 
  VALUES
  ('tatandeveloper@gymapp.com', 'Tatán', '6789', 'Administrator'),
  ('jesusdeveloper@gymapp.com', 'Jesús', '6789', 'Administrator'),
  ('blasdeveloper@gymapp.com', 'Blasco', '6789', 'Administrator'),
  ('luismartinez.12@gmail.com', 'Luis', '1234', 'Client'),
  ('mariadeveloper@gymapp.com', 'Maria', '6789', 'Administrator'),
  ('claudiamateo@gmail.com', 'Claudia', '6789', 'Administrator'),
  ('esteban_89@gmail.com', 'Esteban', '1234', 'Client'),
  ('lupombo@gmail.com', 'Lucía', '6789', 'Administrator');
  
  INSERT INTO activities(Activity_name , Description , Image, Typology, Muscle_group) 
  VALUES
  ('Press de pecho', 'Es sin duda el ejercicio más conocido...', '', 'Fuerza', 'Pecho'),
  ('Flexiones con peso', 'Las flexiones o push up son de lo más eficaces...', '', 'Fuerza', 'Pecho'),
  ('Aperturas de pecho', 'Tumbado boca arriba en el suelo o en el banco...', '', 'Fuerza', 'Pecho'),
  ('Aperturas en T con TRX', 'Si tienes un TRX en casa o en el gimnasio...', '', 'Fuerza', 'Pecho'),
  ('Cruces de polea', 'En la máquina de poleas del gimnasio...', '', 'Fuerza', 'Pecho'),
  ('Band bent over row', 'Con goma elástica en los pies, un remo para dar caña...', '', 'Fuerza', 'Espalda'),
  ('Renegade row', 'En posición de plancha, hacemos una flexión y una vez arriba...', '', 'Fuerza', 'Espalda'),
  ('Remo con mancuerna a una mano', 'Con una rodilla apoyada en un banco, trabajo de dorsal...', '', 'Fuerza', 'Espalda'),
  ('Remo con barra', 'Un básico para ganar fuerza en toda la zona de la espalda...', '', 'Fuerza', 'Espalda'),
  ('Hip thrust', 'Uno de los ejercicios activadores con más éxito...', '', 'Fuerza/Resistencia', 'Glúteos y piernas'),
  ('Frog pumps', 'Es un buen ejercicio para acabar con el entrenamiento...', '', 'Fuerza/Resistencia', 'Glúteos y piernas'),
  ('Abducciones con banda', 'Podemos realizar este ejercicio en la máquina, en bipedestación...', '', 'Fuerza/Resistencia', 'Glúteos y piernas'),
  ('Sentadillas búlgaras', 'Este también es un músculo estirador, pero con la particularidad...', '', 'Fuerza/Resistencia', 'Glúteos y piernas');
  */
}
main();
