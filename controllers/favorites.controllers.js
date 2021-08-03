// se declara variable requerida para obtener la ruta de favorites services
const favoritesService = require('../services/favorites.service');
// se delcara una variable con un objeto vacío
const favoritesController = {};
// se realiza un upsert de favorites, es decir crea y actualiza
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
favoritesController.upsertFavorites = async function (req, res, next) {
  try {
    const favorites = await favoritesService.upsertFavorites(req.body);
    return res.status(201).json({ status: 201, data: favorites });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
// se realiza un get de favorites
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
favoritesController.getFavoritesByUser = async function (req, res, next) {
  try {
    const favorites = await favoritesService.getFavoritesByUser(req.params);
    return res.status(200).json({ status: 200, data: favorites, message: 'Successfully favorites retrieved' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
// se realiza un delete de favorites
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
favoritesController.deleteFavoritesByUserAndSong = async function (req, res, next) {
  try {
    const favorites = await favoritesService.deleteFavoritesByUserAndSong(req.params);
    return res.status(202).json({ status: 202, data: favorites, message: 'Item removed successfully' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
// se exporta el objeto que contiene todas las peticiones dentro
module.exports = favoritesController;
