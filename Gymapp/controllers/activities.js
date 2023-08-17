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
    const id = await createActivities(
      name,
      description,
      image,
      typology,
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

module.exports = {
  newActivityController,
  getActivityController,
  modifyActivityController,
  deleteActivityController,
};
