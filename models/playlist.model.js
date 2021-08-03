// se declara variable requerida de mongoose
const mongoose = require('mongoose');
// se declara variable con el esquema default de mongoose
const Schema = mongoose.Schema;
// se declara variable con el esquema necesario para cada tipo de dato de la
// lista de playlist y si es requerido o no
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
// se declara variable que llama el esquema de playlist
const Playlist = mongoose.model('Playlist', playlistSchema);
// se exporta el el esquema de playlist
module.exports = Playlist;
