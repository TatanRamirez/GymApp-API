const newActivityController = async (req, res, next) => {
  try {
    console.log(req.url);
    console.log(req.method);
    console.log(req.body);
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

const getActivityController = (req, res, next) => {
  try {
    console.log(req.url);
    console.log(req.method);
    console.log(req.body);
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
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
