const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecentsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  songsList: [String],

}, { versionKey: false });

const Recents = mongoose.model('Recents', RecentsSchema);
module.exports = Recents;
