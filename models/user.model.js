// se declara variable requerida de mongoose
const mongoose = require('mongoose');
// se declara variable con el esquema default de mongoose
const Schema = mongoose.Schema;
// se declara variable con el esquema necesario para cada tipo de dato de la
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

}, { versionKey: false });
// se declara variable que llama el esquema de usuarios
const User = mongoose.model('User', userSchema);
// se exporta el el esquema de usuarios
module.exports = User;
