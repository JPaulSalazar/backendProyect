const mongoose = require('mongoose');
const Recents = require('../models/recents.model');

const recentsService = {};

async function findUser(userId) {
  try {
    const user = Recents.findOne({ userId: mongoose.Types.ObjectId(userId) });
    return user || null; // es lo mismo que user ? user : null
  } catch (e) {
    throw new Error('Error while get user');
  }
}

async function createRecents(userId, songsList) {
  try {
    const recents = new Recents({ userId, songsList });
    const newRecents = await recents.save();
    return newRecents;
  } catch (e) {
    throw new Error('Error while save recents');
  }
}

async function updateRecents(user, songsList) {
  try {
    user.songsList.unshift(songsList.toString());
    await user.save();
    return user;
  } catch (e) {
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
    throw new Error('Error while save recents');
  }
};

recentsService.getRecents = async function ({ userId }) {
  try {
    const recents = await Recents.findOne({ userId: `${userId}` });
    return recents;
  } catch (e) {
    throw new Error('Error while returning recents');
  }
};

module.exports = recentsService;
