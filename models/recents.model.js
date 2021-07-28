const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecentsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  songsList: {
    type: [String],
    required: true,
  },

}, { versionKey: false });

const Recents = mongoose.model('Recents', RecentsSchema);
module.exports = Recents;
