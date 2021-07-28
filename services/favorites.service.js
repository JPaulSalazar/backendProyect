const mongoose = require('mongoose');
const Favorites = require('../models/favorites.model');

const favoritesService = {};
async function findUser(userId) {
  try {
    const user = Favorites.findOne({ userId: mongoose.Types.ObjectId(userId) });
    return user || null; // es lo mismo que user ? user : null
  } catch (e) {
    throw new Error('Error while get user');
  }
}

async function createFavorites(userId, songsList) {
  try {
    const favorites = new Favorites({ userId, songsList });
    const newFavorites = await favorites.save();
    return newFavorites;
  } catch (e) {
    throw new Error('Error while save Favorites');
  }
}

async function updateFavorites(user, songsList) {
  try {
    user.songsList.push(songsList.toString());
    await user.save();
    return user;
  } catch (e) {
    throw new Error('Error while update Favorites');
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
    throw new Error('Error while save favorites');
  }
};

favoritesService.getFavorites = async function ({ userId }) {
  try {
    const favorites = await Favorites.findOne({ userId: `${userId}` });
    return favorites;
  } catch (e) {
    throw new Error('Error while returning favorites');
  }
};

module.exports = favoritesService;
