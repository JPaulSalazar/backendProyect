// se declara variable requerida de express
const express = require('express');
// se declara variable con express route para crear la conexión de ruta
const router = express.Router();
// se declara variable con la ruta requerida de usuarios conrollers
const userController = require('../controllers/user.controllers');
// ruta para crear un usuario
router.post('/user', userController.create);
// ruta para obtener todos los usarios
router.get('/users', userController.getUsers);
// ruta para obtener un solo usuario
router.get('/user/:id', userController.getUser);
// ruta para actualizar un usuario
router.put('/user/:id', userController.updateUser);
// ruta para crear la validacion del login con los //datos ingresados por el usuario
router.post('/user/login', userController.userLogin);
// se exportan las rutas
module.exports = router;
