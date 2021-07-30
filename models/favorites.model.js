const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FavoritesSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  songsList: [String],

}, { versionKey: false });

const Favorites = mongoose.model('Favorites', FavoritesSchema);
module.exports = Favorites;
