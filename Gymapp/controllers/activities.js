const newActivityController = async (req, res, next) => {
console.log("controlador nuevas actividades");

}

const getActivityController = (req, res, next) => {
    console.log("controlador para obtener una actividad por ID");
}

const modifyActivityController =(req, res, next) => {
    console.log("controlador para modificar una actividad por ID");
}

const deleteActivityController =(req, res, next) => {
    console.log("controlador para borrar una actividad por ID");
}


module.exports = {
    newActivityController,
    getActivityController,
    modifyActivityController,
    deleteActivityController,
};

// Este comeinzo es una pruebaq que hice para poner lo de usuarios y admins
await connection.query (`CREATE TABLE Usuarios(
    id INT PRIMARY Key,
    nombre VARCHAR (50),
    email VARCHAR (100) UNIQUE NOT NULL,
    rol VARCHAR (20)
);
`);
INSERT INTO Usuarios(id, nombre, email, rol);
VALUES
(1, Tatán, `administrador`),
(2, Marìa, `administrador`),
(3, Jesús, `usuario`),
(4, Blas, `usuario`);

// Aqui ya comienza el comando de actividades y quienes son los que pueden modificarlas.

await connection.query (`CREATE TABLE Activities 
    id INT PRIMARY KEY,
    nombre VARCHAR (50),
    descripcion VARCHAR (255),
    tiempo_minutos (5,2),
    repeticiones INT,
    image VARCHAR (100),
     muscle_group VARCHAR (100)
     );
     `)

     GRANT INSERT TO Activities TO  administrator;

     INSERT INTO Activities (id , nombre, descripcion, tiempo_minutos, repeticiones, muscle_group)