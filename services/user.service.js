// se declara variable requerida de md5 para encriptar datos sensibles
const md5 = require('md5');
// se declara variable requerida de la ruta de users model
const User = require('../models/user.model');
// se declara un objeto vacío
const userService = {};
// se realiza un create de usuarios, es decir crear los datos de cada usuario
// se crea una función asíncrona con su respectiva información en el try,
// sus parámetros y el método save para salvar el documento en la base de datos
// y un catch para los errores
userService.createUser = async function ({ name, email, password }) {
  try {
    const user = new User({ name, email, password: md5(password) });
    const newUser = await user.save();
    return newUser;
  } catch (e) {
    console.log(e.message);
    throw new Error('Error while save user');
  }
};
// se realiza un get de todos los usarios
// se utiliza el método find para encontrar datos específicos y alamcenarlos en un objeto
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
userService.getUsers = async function () {
  try {
    const users = await User.find({});
    return users;
  } catch (e) {
    console.log(e.message);
    throw new Error('Error while Paginating Users');
  }
};
// se realiza un get de un solo usario
// se utiliza el método findById para obtener los datos por medio del id
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
userService.getUser = async function ({ id }) {
  try {
    const user = await User.findById(id);
    const getUser = JSON.parse(JSON.stringify(user));
    delete getUser.password;
    return user;
  } catch (e) {
    console.log(e.message);
    throw new Error('Error while returning user');
  }
};
// se realiza un update de  usarios
// se utiliza el método findById para obtener los datos por medio del id,
// el método save para guardar los datos del documento en la base de datos
// el método set para asignar un nombre de la configuración a un valor
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
userService.updateUser = async function ({ id }, { name }) {
  try {
    const user = await User.findById(id);
    const updateUser = await user.set({ name });
    delete updateUser.password;
    await updateUser.save();
    return updateUser;
  } catch (e) {
    console.log(e.message);
    throw new Error('Error while update user');
  }
};
// se crea la validación del login
// se utiliza el método findOne, para devolver un solo documento
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
userService.userLogin = async function ({ email, password }) {
  try {
    const userInfo = await User.findOne({ email });
    // si el password ingreado es igual al password encriptado
    if (userInfo.password === md5(password)) {
      // se crea un objeto con la información necesaria
      const info = {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        existe: true,
      };
      // de lo contrario devuelve falso
      return info;
    }
    // si los datos ya existen, se devuelve falso
    const info = {
      existe: false,
    };
    return info;
  } catch (e) {
    console.log(e.message);
    throw new Error('Error dont exist User');
  }
};
// exporta el objeto con todos los métodos
module.exports = userService;