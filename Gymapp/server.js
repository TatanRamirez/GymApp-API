require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const {
  newUserController,
  getUserController,
  loginController,
} = require('./controllers/user');

const {
  newActivityController,
  getActivityController,
  modifyActivityController,
  deleteActivityController,
} = require('./controllers/activities');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//Rutas de usuario
app.post('/user', newUserController);
app.get('/user/:id', getUserController);
app.post('/login', loginController);

//Rutas de activities
app.post('/activity', newActivityController);
app.get('/activity/:id', getActivityController);
app.put('/activity/:id', modifyActivityController);
app.delete('/activity/:id', deleteActivityController);

// Middleware de 404
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

// Middleware de gestion de errores
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});
// Lanzamos el servidor
app.listen(3000, () => {
  console.log('Servidor funcionando! 🏋️💪');
});
