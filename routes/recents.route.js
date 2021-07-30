const express = require('express');

const router = express.Router();
const recentsConstroller = require('../controllers/recents.controllers');

router.put('/recents', recentsConstroller.upsertRecents);

router.get('/recents/:userId', recentsConstroller.getRecentsByUser);

module.exports = router;
