const playlistService = require('../services/playlist.service');

const playlistController = {};
playlistController.createPlaylist = async function (req, res, next) {
  try {
    const playlist = await playlistService.createPlaylist(req.body);
    return res.status(201).json({ status: 201, data: playlist });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

playlistController.updatePlaylist = async function (req, res, next) {
  try {
    const playlist = await playlistService.updatePlaylist(req.params, req.body);
    return res.status(200).json({ playlist });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

playlistController.getPlaylistByUser = async function (req, res, next) {
  try {
    const playlist = await playlistService.getPlaylistByUser(req.params);
    return res.status(200).json({ status: 200, data: playlist, message: 'Successfully playlist retrieved' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

playlistController.getPlaylist = async function (req, res, next) {
  try {
    const playlist = await playlistService.getPlaylist(req.params);
    return res.status(200).json({ status: 200, data: playlist, message: 'Successfully playlist retrieved' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

playlistController.deletePlaylist = async function (req, res, next) {
  try {
    const playlist = await playlistService.deletePlaylist(req.params);
    return res.status(202).json({ status: 202, data: playlist, message: 'Item removed successfully' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

playlistController.deletePlaylistAll = async function (req, res, next) {
  try {
    const playlist = await playlistService.deletePlaylistAll(req.params);
    return res.status(200).json({ status: 200, data: playlist, message: 'Successfully deleted playlist' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

playlistController.updateNamePlaylist = async function (req, res, next) {
  try {
    const playlist = await playlistService.updateNamePlaylist(req.params, req.body);
    return res.status(200).json({ status: 200, data: playlist });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
module.exports = playlistController;
