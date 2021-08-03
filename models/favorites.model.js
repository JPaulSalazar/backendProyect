// se declara variable requerida de mongoose
const mongoose = require('mongoose');
// se declara variable con el esquema default de mongoose
const Schema = mongoose.Schema;
// se declara variable con el esquema necesario para cada tipo de dato de la
// lista de favoritos y si es requerido o no
const FavoritesSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  songsList: [String],

}, { versionKey: false });
// se declara variable llama el esquema de favoritos
const Favorites = mongoose.model('Favorites', FavoritesSchema);
// se exporta el el esquema de favoritos
module.exports = Favorites;
