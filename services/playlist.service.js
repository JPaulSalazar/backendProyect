const mongoose = require('mongoose');
const Playlist = require('../models/playlist.model');

const playlistService = {};

async function findUser(userId) {
  try {
    const user = Playlist.findOne({ userId: mongoose.Types.ObjectId(userId) });
    return user || null; // es lo mismo que user ? user : null
  } catch (e) {
    console.log('Error Message', e.message);
    throw Error('Error while getting user');
  }
}

playlistService.getPlaylistByUser = async function ({ userId }) {
  try {
    const playlist = await Playlist.find({ userId: mongoose.Types.ObjectId(userId) });
    return playlist;
  } catch (e) {
    console.log('Error Message', e.message);
    // Log Errors
    throw Error('Error while getting playlist');
  }
};

playlistService.getPlaylist = async function ({ id }) {
  try {
    const playlist = await Playlist.findById(id);
    return playlist;
  } catch (e) {
    console.log('Error Message', e.message);
    // Log Errors
    throw Error('Error while getting playlist');
  }
};

playlistService.createPlaylist = async function ({ userId, name, songsList }) {
  try {
    const playlist = new Playlist({ userId, name, songsList });
    const newPlaylist = await playlist.save();
    return newPlaylist;
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while save playlist');
  }
};

playlistService.updatePlaylist = async function ({ id }, { songsList }) {
  try {
    const playlists = await Playlist.findById(id);
    for (let i = 0; i < songsList.length; i++) {
      if (playlists.songsList.indexOf(songsList[i]) === -1) {
        playlists.songsList.push(songsList[i]);
      }
    }
    await playlists.save();
    return playlists;
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while update playlist');
  }
};

playlistService.deletePlaylist = async function ({ id, song }) {
  try {
    const playlist = await Playlist.findById(id);
    playlist.songsList.pull(song);
    playlist.save();
    return playlist;
  } catch (e) {
    // Log Errors
    console.log('Error Message', e.message);
    throw Error('Error while delete playlist');
  }
};

playlistService.deletePlaylistAll = async function ({ id }) {
  try {
    const playlist = await Playlist.findByIdAndRemove(id);
    return playlist;
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while delete playlist');
  }
};

playlistService.updateNamePlaylist = async function ({ id }, { name }) {
  try {
    const playlists = await Playlist.findById(id);
    const updateName = await playlists.set({ name });
    await updateName.save();
    return updateName;
  } catch (e) {
    console.log(e.message);
    throw Error('Error while save playist name');
  }
};

module.exports = playlistService;
