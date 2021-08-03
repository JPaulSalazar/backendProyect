const mongoose = require('mongoose');
const Recents = require('../models/recents.model');

const recentsService = {};

recentsService.getRecentsByUser = async function ({ userId }) {
  try {
    const recents = await Recents.find({ userId: mongoose.Types.ObjectId(userId) });
    return recents;
  } catch (e) {
    console.log('Error Message', e.message);
    // Log Errors
    throw Error('Error while Paginating recents');
  }
};

async function findUser(userId) {
  try {
    const user = Recents.findOne({ userId: mongoose.Types.ObjectId(userId) });
    return user || null; // es lo mismo que user ? user : null
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while get user');
  }
}

async function createRecents(userId, songsList) {
  try {
    const recents = new Recents({ userId, songsList });
    const newRecents = await recents.save();
    return newRecents;
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while save recents');
  }
}

async function updateRecents(user, songsList) {
  try {
    for (let i = 0; i < songsList.length; i++) {
      if (user.songsList.indexOf(songsList[i]) === -1) {
        user.songsList.unshift(songsList[i]);
      }
    }
    await user.save();
    return user;
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while update recents');
  }
}

recentsService.upsertRecents = async function ({ userId, songsList }) {
  try {
    const user = await findUser(userId);
    if (user) {
      return await updateRecents(user, songsList);
    }
    return await createRecents(userId, songsList);
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while save recents');
  }
};

module.exports = recentsService;
