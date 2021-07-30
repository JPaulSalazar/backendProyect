const express = require('express');

const router = express.Router();
const playlistController = require('../controllers/playlist.controller');

router.put('/playlist', playlistController.upsertPlaylist);

router.get('/playlist/:userId', playlistController.getPlaylistByUser);

router.delete('/playlist/:userId/songList/:songList', playlistController.deletePlaylistByUserAndSong);

router.delete('/playlist/:userId', playlistController.deletePlaylistAll);

router.put('/playlist/:id', playlistController.updateNamePlaylist);

module.exports = router;
