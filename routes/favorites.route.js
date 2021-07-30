const express = require('express');

const router = express.Router();
const favoritesController = require('../controllers/favorites.controllers');

router.put('/favorites', favoritesController.upsertFavorites);

router.get('/favorites/:userId', favoritesController.getFavoritesByUser);

router.delete('/favorites/:userId/songList/:songList', favoritesController.deleteFavoritesByUserAndSong);
module.exports = router;
