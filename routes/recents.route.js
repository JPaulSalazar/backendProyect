const express = require('express');

const router = express.Router();
const recentsConstroller = require('../controllers/recents.controllers');

router.put('/recents', recentsConstroller.upsert);

router.get('/recents/:userId', recentsConstroller.getRecents);

module.exports = router;
