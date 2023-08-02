const newActivityController = async (req, res, next) => {
  console.log('controlador nuevas actividades');
};

const getActivityController = (req, res, next) => {
  console.log('controlador para obtener una actividad por ID');
};

const modifyActivityController = (req, res, next) => {
  console.log('controlador para modificar una actividad por ID');
};

const deleteActivityController = (req, res, next) => {
  console.log('controlador para borrar una actividad por ID');
};

module.exports = {
  newActivityController,
  getActivityController,
  modifyActivityController,
  deleteActivityController,
};
