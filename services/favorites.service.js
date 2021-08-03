// se declara variable requerida de moongose
const mongoose = require('mongoose');
// se declara variable requerida de la ruta de favorites model
const Favorites = require('../models/favorites.model');
// se declara un objeto vacío
const favoritesService = {};
// se realiza un get de favorites
// se utiliza el método find para hacer una búsqueda por id
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
favoritesService.getFavoritesByUser = async function ({ userId }) {
  try {
    const favorites = await Favorites.find({ userId: mongoose.Types.ObjectId(userId) });
    return favorites;
  } catch (e) {
    console.log('Error Message', e.message);
    // Log Errors
    throw Error('Error while Paginating Favorite Music');
  }
};
// se realiza una búsqueda de los usarios por id,
// se utiliza el método findOne, para devolver un solo documento
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
async function findUser(userId) {
  try {
    const user = Favorites.findOne({ userId: mongoose.Types.ObjectId(userId) });
    return user || null; // es lo mismo que user ? user : null
  } catch (e) {
    console.log('Error Message', e.message);
    throw Error('Error while getting user');
  }
}
// se realiza un create de favoritos, recibe los parámetros respectivos
// se utiliza el método save, para guardar el documento con la
// información correspondiente en la base de datos
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
async function createFavorites(userId, songsList) {
  try {
    const favorites = new Favorites({ userId, songsList });
    const newFavorites = await favorites.save();
    return newFavorites;
  } catch (e) {
    console.log('Error Message', e.message);
    throw Error('Error while save Favorites');
  }
}
// se realiza un update de favoritos, recibe los parámetros respectivos
// se utiliza el método save, para guardar el documento con la
// información correspondiente en la base de datos
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
async function updateFavorites(user, songsList) {
  try {
    // se recorre la lista de canciones
    for (let i = 0; i < songsList.length; i++) {
      // si en la lista no esxiste la canción, se envía al array
      if (user.songsList.indexOf(songsList[i]) === -1) {
        user.songsList.push(songsList[i]);
      }
    }
    await user.save();
    return user;
  } catch (e) {
    console.log('Error Message', e.message);
    throw Error('Error while update Favorites');
  }
}
// se realiza un delete de favoritos,
// se utiliza el método save, para guardar el documento con la
// información correspondiente en la base de datos
// se utiliza método pull para eliminar un elemento de la coleción y devolver el elemento extraído
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
async function deleteFavorites(user, songsList) {
  try {
    user.songsList.pull(songsList);
    user.save();
    return user;
  } catch (e) {
    // Log Errors
    console.log('Error Message', e.message);
    throw Error('Error while delete Favorite Music');
  }
}
// se realiza un upsert de favoritos con sus parámetros indicados
// se llaman a los métodos create y update si el suario existe
// se ejecutan los métodos de update y create
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
favoritesService.upsertFavorites = async function ({ userId, songsList }) {
  try {
    const user = await findUser(userId);
    if (user) {
      return await updateFavorites(user, songsList);
    }
    return await createFavorites(userId, songsList);
  } catch (e) {
    console.log('Error Message', e.message);
    throw Error('Error while save favorites');
  }
};
// se realiza un delete de favoritos,
// se utiliza el método find, para buscar el usuario por medio del id
// si el usuario existe ejecuta el primer delete
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
favoritesService.deleteFavoritesByUserAndSong = async function ({ userId, songList }) {
  try {
    const user = await findUser(userId);
    if (user) {
      return deleteFavorites(user, songList);
    }
  } catch (e) {
    console.log('Error Message', e.message);
    throw Error('Error while save Favorite Music');
  }
};
// se exporta el objeto con todos los métodos
module.exports = favoritesService;
