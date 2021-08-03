// se declara variable requerida de express
const express = require('express');
// se declara variable con express route para crear la conexión de ruta
const router = express.Router();
// se declara variable con la ruta requerida de favorites controllers
const favoritesController = require('../controllers/favorites.controllers');
// ruta para actualizar favoritos
router.put('/favorites', favoritesController.upsertFavorites);
// ruta para obtener favoritos por el id usuario
router.get('/favorites/:userId', favoritesController.getFavoritesByUser);
// ruta para eliminar una canción de favoritos
router.delete('/favorites/:userId/songList/:songList', favoritesController.deleteFavoritesByUserAndSong);
// se exportan las rutas
module.exports = router;
