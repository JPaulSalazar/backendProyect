// se declara variable requerida de express
const express = require('express');
// se declara variable con express route para crear la conexión de ruta
const router = express.Router();
// se declara variable con la ruta requerida de playlist controllers
const playlistController = require('../controllers/playlist.controller');
// ruta para actualizar una playlist de acuerdo al id
router.put('/playlist/:id', playlistController.updatePlaylist);
// ruta para crear una playlist 
router.post('/playlist', playlistController.createPlaylist);
// ruta para obtener una playlist de acuerdo al id del usuario
router.get('/playlist/:userId', playlistController.getPlaylistByUser);
// ruta para obtener una playlist de acuerdo al id
router.get('/oneplaylist/:id', playlistController.getPlaylist);
// ruta para eliminar una canción de acuerdo al id del playlist
router.delete('/playlist/:id/songList/:song', playlistController.deletePlaylist);
// ruta para eliminar todas las playlists de acuerdo al id del usuario
router.delete('/playlist/:id', playlistController.deletePlaylistAll);
// ruta para actualizar el nombre de una playlist de acuerdo al id
router.put('/playlist/name/:id', playlistController.updateNamePlaylist);
// se exportan las rutas
module.exports = router;
