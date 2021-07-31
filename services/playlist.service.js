const mongoose = require('mongoose');
const Playlist = require('../models/playlist.model');

const playlistService = {};

playlistService.getPlaylistByUser = async function ({ userId }) {
  try {
    const playlist = await Playlist.find({ userId: mongoose.Types.ObjectId(userId) });
    return playlist;
  } catch (e) {
    console.log('Error Message', e.message);
    // Log Errors
    throw Error('Error while Paginating playlist');
  }
};

async function findUser(userId) {
  try {
    const user = Playlist.findOne({ userId: mongoose.Types.ObjectId(userId) });
    return user || null; // es lo mismo que user ? user : null
  } catch (e) {
    console.log('Error Message', e.message);
    throw Error('Error while getting user');
  }
}

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
    for (let i = 0; i < { songsList }.length; i++) {
      if (playlists.songsList.indexOf({ songsList }[i]) === -1) {
        playlists.songsList.push({ songsList }[i]);
      }
    }
    await playlists.save();
    return playlists;
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while update playlist');
  }
};

// async function updatePlaylist(user, songsList) {
//   try {
//     for (let i = 0; i < songsList.length; i++) {
//       if (user.songsList.indexOf(songsList[i]) === -1) {
//         user.songsList.push(songsList[i]);
//       }
//     }
//     await user.save();
//     return user;
//   } catch (e) {
//     console.log('Error Message', e.message);
//     throw new Error('Error while update Recent Music');
//   }
// }

async function deletePlaylist(user, songsList) {
  try {
    user.songsList.pull(songsList);
    user.save();
    return user;
  } catch (e) {
    // Log Errors
    console.log('Error Message', e.message);
    throw Error('Error while delete playlist');
  }
}

// playlistService.upsertPlaylist = async function ({ userId, name, songsList }) {
//   try {
//     const user = await findUser(userId);
//     if (user) {
//       return await updatePlaylist(user, songsList);
//     }
//     return await createPlaylist(userId, name, songsList);
//   } catch (e) {
//     console.log('Error Message', e.message);
//     throw Error('Error while save playlist');
//   }
// };

playlistService.deletePlaylistByUserAndSong = async function ({ userId, songList }) {
  try {
    const user = await findUser(userId);
    if (user) {
      return deletePlaylist(user, songList);
    }
  } catch (e) {
    // Log Errors
    console.log('Error Message', e.message);
    throw Error('Error while save playlist');
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
