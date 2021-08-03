// se declara variable requerida para obtener la ruta de playlist services
const playlistService = require('../services/playlist.service');
// se delcara una variable con un objeto vacío
const playlistController = {};
// se realiza un create de playlist,
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
playlistController.createPlaylist = async function (req, res, next) {
  try {
    const playlist = await playlistService.createPlaylist(req.body);
    return res.status(201).json({ status: 201, data: playlist });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
// se realiza un update de playlist,
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
playlistController.updatePlaylist = async function (req, res, next) {
  try {
    const playlist = await playlistService.updatePlaylist(req.params, req.body);
    return res.status(200).json({ playlist });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
// se realiza un get de playlist por usuario, es decir obtiener datos de  la playlist por usuario
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
playlistController.getPlaylistByUser = async function (req, res, next) {
  try {
    const playlist = await playlistService.getPlaylistByUser(req.params);
    return res.status(200).json({ status: 200, data: playlist, message: 'Successfully playlist retrieved' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
// se realiza un get de playlist, es decir obtiene todas las playlist
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
playlistController.getPlaylist = async function (req, res, next) {
  try {
    const playlist = await playlistService.getPlaylist(req.params);
    return res.status(200).json({ status: 200, data: playlist, message: 'Successfully playlist retrieved' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
// se realiza un delte de una playlist, es decir elimina una única playlist
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
playlistController.deletePlaylist = async function (req, res, next) {
  try {
    const playlist = await playlistService.deletePlaylist(req.params);
    return res.status(202).json({ status: 202, data: playlist, message: 'Item removed successfully' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
// se realiza un delte de playlist, es decir elimina todas las playlist
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
playlistController.deletePlaylistAll = async function (req, res, next) {
  try {
    const playlist = await playlistService.deletePlaylistAll(req.params);
    return res.status(200).json({ status: 200, data: playlist, message: 'Successfully deleted playlist' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
// se realiza un update del nombre  playlist, 
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
playlistController.updateNamePlaylist = async function (req, res, next) {
  try {
    const playlist = await playlistService.updateNamePlaylist(req.params, req.body);
    return res.status(200).json({ status: 200, data: playlist });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
// se exporta el objeto que contiene todas las peticiones dentro
module.exports = playlistController;
