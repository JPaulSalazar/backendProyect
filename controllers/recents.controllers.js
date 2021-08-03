// se declara variable requerida para obtener la ruta de recientes en services
const recentsService = require('../services/recents.service');
// se delcara una variable con un objeto vacío
const recentsController = {};
// se realiza un upsert de recents, es decir crea y actualiza
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
recentsController.upsertRecents = async function (req, res, next) {
  try {
    const recents = await recentsService.upsertRecents(req.body);
    return res.status(201).json({ status: 201, data: recents });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
// se realiza un get de recents, 
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
recentsController.getRecentsByUser = async function (req, res, next) {
  try {
    const recents = await recentsService.getRecentsByUser(req.params);
    return res.status(200).json({ status: 200, data: recents, message: 'Successfully recents retrieved' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
// se exporta el objeto que contiene todas las peticiones dentro
module.exports = recentsController;
