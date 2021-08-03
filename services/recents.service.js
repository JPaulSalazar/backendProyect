// se declara variable requerida de moongose
const mongoose = require('mongoose');
// se declara variable requerida de la ruta de recents model
const Recents = require('../models/recents.model');
// se declara un objeto vacío
const recentsService = {};
// se realiza un get de las listas recintes del usuario
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
recentsService.getRecentsByUser = async function ({ userId }) {
  try {
    const recents = await Recents.find({ userId: mongoose.Types.ObjectId(userId) });
    return recents;
  } catch (e) {
    console.log('Error Message', e.message);
    // Log Errors
    throw Error('Error while Paginating recents');
  }
};
// se realiza una búsqueda de los usarios por id,
// se utiliza el método findOne, para devolver un solo documento
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
async function findUser(userId) {
  try {
    const user = Recents.findOne({ userId: mongoose.Types.ObjectId(userId) });
    return user || null; // es lo mismo que user ? user : null
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while get user');
  }
}
// se realiza un create de recents, recibe los parámetros respectivos
// se utiliza el método save, para guardar el documento con la
// información correspondiente en la base de datos
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
async function createRecents(userId, songsList) {
  try {
    const recents = new Recents({ userId, songsList });
    const newRecents = await recents.save();
    return newRecents;
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while save recents');
  }
}
// se realiza un update de recientes con sus parámetros indicados
// se utiliza el método save, para guardar el documento con la
// información correspondiente en la base de datos
// se utiliza método de unshift para colocar un elemento al inicio del array
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
async function updateRecents(user, songsList) {
  try {
    for (let i = 0; i < songsList.length; i++) {
      if (user.songsList.indexOf(songsList[i]) === -1) {
        user.songsList.unshift(songsList[i]);
      }
    }
    await user.save();
    return user;
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while update recents');
  }
}
// se realiza un upsert de recientes con sus parámetros indicados
// se llaman a los métodos create y update si el usuario es encontrado
// se ejecutan los métodos de update y create
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
recentsService.upsertRecents = async function ({ userId, songsList }) {
  try {
    const user = await findUser(userId);
    if (user) {
      return await updateRecents(user, songsList);
    }
    return await createRecents(userId, songsList);
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while save recents');
  }
};
// se exporta el objeto con los métodos
module.exports = recentsService;
