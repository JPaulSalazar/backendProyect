const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  songsList: [String],
}, { versionKey: false });

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;
