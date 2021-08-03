// se declara variable requerida para obtener la ruta de user services
const userService = require('../services/user.service');
// se delcara una variable con un objeto vacío
const userController = {};
const userController = {};
// se realiza un create de users, 
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
userController.create = async function (req, res, next) {
  try {
    const newUser = await userService.createUser(req.body);
    return res.status(201).json({ newUser });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
// se realiza un get de users, es decir obtener los usuarios, en general
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
userController.getUsers = async function (req, res, next) {
  try {
    const user = await userService.getUsers();
    return res.status(200).json({ status: 200, data: user, message: 'Successfully users retrieved' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
// se realiza un get de users, es decir obtener datos de un único usuario
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
userController.getUser = async function (req, res, next) {
  try {
    const user = await userService.getUser(req.params);
    if (user == null) {
      return res.status(400).json({ status: 200, data: user, message: 'Cannot find user' });
    }
    return res.status(200).json({ dtatus: 200, data: user, message: 'Successfully user retrieved' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
// se realiza un update de users,
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
userController.updateUser = async function (req, res, next) {
  try {
    const updateUser = await userService.updateUser(req.params, req.body);
    return res.status(200).json({ status: 200, data: updateUser, message: 'Successfully update user' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
// se crea la validación del login
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
userController.userLogin = async function (req, res, next) {
  try {
    const loginUser = await userService.userLogin(req.body);
    return res.status(200).json({ status: 200, data: loginUser, message: 'Successfully get user profile' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
// se exporta el objeto que contiene todas las peticiones dentro
module.exports = userController;
