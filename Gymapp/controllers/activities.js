const jwt = require('jsonwebtoken');
const {
  modifyActivity,
  createActivities,
  getActivityById,
  deleteById,
} = require('../db/activities');

const newActivityController = async (req, res, next) => {
  try {
    const { name, description, image, typology, muscleGroup } = req.body;

    if (!name || !description || !image || !typology || !muscleGroup) {
      const error = new Error('Debes enviar los valores correctos');
      error.httpStatus = 400;
      throw error;
    }
    //los cambios son abajo, en las partes de la descripcion, imagen y tipologia, añadiendo unas rutas para que nos añadan la informacion necesaria.
    const id = await createActivities(
      name,
      description imgElement.alt = "Descripción de la imagen";
      ,
      image imgElement.src = "ruta/de/la/imagen.jpg";
      ,
      typology imgElement.classList.add("imagen-tipo");,
      muscleGroup
    );

    res.send({
      status: 'Ok',
      message: `Activity created with Id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

const getActivityController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activity = await getActivityById(id);
    res.send({
      status: 'Ok',
      data: activity,
    });
  } catch (error) {
    next(error);
  }
};

const modifyActivityController = async (req, res, next) => {
  try {
    const { name, description, image, typology, muscleGroup } = req.body;
    const { id } = req.params;
    if (!name || !description || !image || !typology || !muscleGroup) {
      const error = new Error('Debes enviar los valores correctos');
      error.httpStatus = 400;
      throw error;
    }
    const result = await modifyActivity(
      id,
      name,
      description,
      image,
      typology,
      muscleGroup
    );

    res.send({
      status: 'Ok',
      message: 'Activity updated with Id: ${id}',
    });
  } catch (error) {
    next(error);
  }
};

const deleteActivityController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activity = await deleteById(id);
    res.send({
      status: 'Ok',
      data: activity,
    });
  } catch (error) {
    next(error);
  }
};
function requireAdmin(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }
  let token = req.headers.authorization.split(' ')[1];

  if (token === 'null') {
    return res.status(401).send('Unauthorized request');
  }
  let payload = jwt.verify(token, process.env.SECRET);
  if (!payload) {
    return res.status(401).send('Unauthorized request');
  }
  if (payload.role != 'administrator') {
    return res.status(401).send('Unauthorized request');
  }
  next();
}
module.exports = {
  newActivityController,
  getActivityController,
  modifyActivityController,
  deleteActivityController,
  requireAdmin,
};
