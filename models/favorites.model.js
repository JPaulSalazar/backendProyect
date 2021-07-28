const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FavoritesSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  songsList: {
    type: [String],
    required: true,
  },

}, { versionKey: false });

const Favorites = mongoose.model('Favorites', FavoritesSchema);
module.exports = Favorites;
