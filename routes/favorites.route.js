const express = require('express');

const router = express.Router();
const favoritesConstroller = require('../controllers/favorites.controllers');

router.put('/favorites', favoritesConstroller.upsert);

router.get('/favorites/:userId', favoritesConstroller.getFavorites);

module.exports = router;
