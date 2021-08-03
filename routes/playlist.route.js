const express = require('express');

const router = express.Router();
const playlistController = require('../controllers/playlist.controller');

router.put('/playlist/:id', playlistController.updatePlaylist);

router.post('/playlist', playlistController.createPlaylist);

router.get('/playlist/:userId', playlistController.getPlaylistByUser);

router.get('/oneplaylist/:id', playlistController.getPlaylist);

router.delete('/playlist/:id/songList/:song', playlistController.deletePlaylist);

router.delete('/playlist/:id', playlistController.deletePlaylistAll);

router.put('/playlist/name/:id', playlistController.updateNamePlaylist);

module.exports = router;
