// se declara variable requerida de mongoose
const mongoose = require('mongoose');
// se declara variable con el esquema default de mongoose
const Schema = mongoose.Schema;
// se declara variable con el esquema necesario para cada tipo de dato de la
// lista de recientes y si es requerido o no
const RecentsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  songsList: [String],

}, { versionKey: false });
// se declara variable que llama el esquema de recientes
const Recents = mongoose.model('Recents', RecentsSchema);
// se exporta el el esquema de recientes
module.exports = Recents;
