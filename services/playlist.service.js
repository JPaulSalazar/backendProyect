const Playlist = require('../models/playlist.model');

const playlistService = {};

playlistService.createPlaylist = async function ({userId, nameList, songsList }) {
  try {
    const playlist = new Playlist({ userId, nameList, songsList });
    const newPlaylist = await playlist.save();
    return newPlaylist;
  } catch (e) {
    throw new Error('Error while save playlist');
  }
};

playlistService.getPlaylist = async function () {
  try {
    const playlists = await Playlist.find({});
    return playlists;
  } catch (e) {
    throw new Error('Error while Paginating Playlist');
  }
};
module.exports = playlistService;
