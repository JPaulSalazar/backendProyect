const mongoose = require('mongoose');
const Favorites = require('../models/favorites.model');

const favoritesService = {};

favoritesService.getFavoritesByUser = async function ({ userId }) {
  try {
    const favorites = await Favorites.find({ userId: mongoose.Types.ObjectId(userId) });
    return favorites;
  } catch (e) {
    console.log('Error Message', e.message);
    // Log Errors
    throw Error('Error while Paginating Favorite Music');
  }
};

async function findUser(userId) {
  try {
    const user = Favorites.findOne({ userId: mongoose.Types.ObjectId(userId) });
    return user || null; // es lo mismo que user ? user : null
  } catch (e) {
    console.log('Error Message', e.message);
    throw Error('Error while getting user');
  }
}

async function createFavorites(userId, songsList) {
  try {
    const favorites = new Favorites({ userId, songsList });
    const newFavorites = await favorites.save();
    return newFavorites;
  } catch (e) {
    console.log('Error Message', e.message);
    throw Error('Error while save Favorites');
  }
}

async function updateFavorites(user, songsList) {
  try {
    for (let i = 0; i < songsList.length; i++) {
      if (user.songsList.indexOf(songsList[i]) === -1) {
        user.songsList.push(songsList[i]);
      }
    }
    await user.save();
    return user;
  } catch (e) {
    console.log('Error Message', e.message);
    throw Error('Error while update Favorites');
  }
}

async function deleteFavorites(user, songsList) {
  try {
    user.songsList.pull(songsList);
    user.save();
    return user;
  } catch (e) {
    // Log Errors
    console.log('Error Message', e.message);
    throw Error('Error while delete Favorite Music');
  }
}

favoritesService.upsertFavorites = async function ({ userId, songsList }) {
  try {
    const user = await findUser(userId);
    if (user) {
      return await updateFavorites(user, songsList);
    }
    return await createFavorites(userId, songsList);
  } catch (e) {
    console.log('Error Message', e.message);
    throw Error('Error while save favorites');
  }
};

favoritesService.deleteFavoritesByUserAndSong = async function ({ userId, songList }) {
  try {
    const user = await findUser(userId);
    if (user) {
      return deleteFavorites(user, songList);
    }
  } catch (e) {
    // Log Errors
    console.log('Error Message', e.message);
    throw Error('Error while save Favorite Music');
  }
};

module.exports = favoritesService;
