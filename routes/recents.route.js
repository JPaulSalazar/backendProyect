// se declara variable requerida de express
const express = require('express');
// se declara variable con express route para crear la conexión de ruta
const router = express.Router();
// se declara variable con la ruta requerida de recientes conrollers
const recentsConstroller = require('../controllers/recents.controllers');
// ruta para actualizar recientes
router.put('/recents', recentsConstroller.upsertRecents);
// ruta para obtener recientes
router.get('/recents/:userId', recentsConstroller.getRecentsByUser);
// se exportan las rutas
module.exports = router;
