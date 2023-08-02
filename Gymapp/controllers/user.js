const { getUserById } = require('../db/users');

const newUserController = async (req, res, next) => {};

const getUserController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    res.send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {};

module.exports = {
  newUserController,
  getUserController,
  loginController,
};
