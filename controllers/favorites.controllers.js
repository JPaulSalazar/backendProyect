const favoritesService = require('../services/favorites.service');

const favoritesController = {};

favoritesController.upsert = async function (req, res, next) {
  try {
    const upsertFavorites = await favoritesService.upsertFavorites(req.body);
    return res.status(201).json({ status: 201, data: upsertFavorites});
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

favoritesController.getFavorites = async function (req, res, next) {
  try {
    const userId = await favoritesService.getFavorites(req.params);
    if (userId == null) {
      return res.status(400).json({ status: 200, data: userId, message: 'Cannot find favorites with that user id' });
    }
    return res.status(200).json({ dtatus: 200, data: userId, message: 'Successfully favorites retrieved' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports = favoritesController;
