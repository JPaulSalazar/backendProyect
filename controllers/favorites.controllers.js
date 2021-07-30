const favoritesService = require('../services/favorites.service');

const favoritesController = {};

favoritesController.upsertFavorites = async function (req, res, next) {
  try {
    const favorites = await favoritesService.upsertFavorites(req.body);
    return res.status(201).json({ status: 201, data: favorites });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

favoritesController.getFavoritesByUser = async function (req, res, next) {
  try {
    const favorites = await favoritesService.getFavoritesByUser(req.params);
    return res.status(200).json({ status: 200, data: favorites, message: 'Successfully favorites retrieved' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
favoritesController.deleteFavoritesByUserAndSong = async function (req, res, next) {
  try {
    const favorites = await favoritesService.deleteFavoritesByUserAndSong(req.params);
    return res.status(202).json({ status: 202, data: favorites, message: 'Item removed successfully' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

module.exports = favoritesController;
