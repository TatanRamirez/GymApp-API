require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const {
    newUserController,
    getUserController,
    loginController
} = require("./controllers/user");

const {
    newActivityController,
    getActivityController,
    modifyActivityController,
    deleteActivityController
} = require("./controllers/activities");

const {
    newEmployeeController,
    getEmployeeController,
    modifyEmployeeController,
    deleteEmployeeController
} = require("./controllers/employees");

const app = express();

app.use(morgan("dev"));

//Rutas de usuario
app.post("/user", newUserController);
app.get("/user/:id", getUserController);
app.post("/login", loginController);

//Rutas de activities
app.post("/activity", newActivityController);
app.get("/activity/:id", getActivityController);
app.put("/activity/:id", modifyActivityController);
app.delete("/activity/:id", deleteActivityController);

//Rutas de Employees
app.post("/employee", newEmployeeController);
app.get("/employee/:id", getEmployeeController);
app.put("/employee/:id", modifyEmployeeController);
app.delete("/employee/:id", deleteEmployeeController);

// Middleware de 404
app.use((req, res) => {
    res.status(404).send({
        status: "error",
        message: "Not found",
    });
});

//Middleware de gestion de errores
app.use((error, req, res, next) => {
    console.error(error);

    res.status(error.httpStatus || 500).send({
        status: "error",
        message: error.message,
        
    });
});
// Lanzamos el servidor
app.listen(3000, () => {
    console.log("Servidor funcionando! 🏋️💪");
});