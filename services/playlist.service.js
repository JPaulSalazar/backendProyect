// se declara variable requerida de moongose
const mongoose = require('mongoose');
// se declara variable requerida de la ruta de playlist model
const Playlist = require('../models/playlist.model');
// se declara un objeto vacío
const playlistService = {};
// se realiza una búsqueda de los usarios por id,
// se utiliza el método findOne, para devolver un solo documento
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
async function findUser(userId) {
  try {
    const user = Playlist.findOne({ userId: mongoose.Types.ObjectId(userId) });
    return user || null; // es lo mismo que user ? user : null
  } catch (e) {
    console.log('Error Message', e.message);
    throw Error('Error while getting user');
  }
}
// se realiza un get de playlist por id usuario
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
playlistService.getPlaylistByUser = async function ({ userId }) {
  try {
    const playlist = await Playlist.find({ userId: mongoose.Types.ObjectId(userId) });
    return playlist;
  } catch (e) {
    console.log('Error Message', e.message);
    // Log Errors
    throw Error('Error while getting playlist');
  }
};
// se realiza un get de playlist por id 
// se utiliza el método findById, para buscar un solo documento por su id
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
playlistService.getPlaylist = async function ({ id }) {
  try {
    const playlist = await Playlist.findById(id);
    return playlist;
  } catch (e) {
    console.log('Error Message', e.message);
    // Log Errors
    throw Error('Error while getting playlist');
  }
};
// se realiza un create de playlist, recibe los parámetros respectivos
// se utiliza el método save, para guardar el documento con la
// información correspondiente en la base de datos
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
playlistService.createPlaylist = async function ({ userId, name, songsList }) {
  try {
    const playlist = new Playlist({ userId, name, songsList });
    const newPlaylist = await playlist.save();
    return newPlaylist;
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while save playlist');
  }
};
// se realiza un update de playlist, recibe los parámetros respectivos
// se utiliza el método save, para guardar el documento con la
// información correspondiente en la base de datos
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
playlistService.updatePlaylist = async function ({ id }, { songsList }) {
  try {
    const playlists = await Playlist.findById(id);
    // se recorre la lista de canciones
    for (let i = 0; i < songsList.length; i++) {
      // si en la lista no esxiste la canción, se envía al array
      if (playlists.songsList.indexOf(songsList[i]) === -1) {
        playlists.songsList.push(songsList[i]);
      }
    }
    await playlists.save();
    return playlists;
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while update playlist');
  }
};
// se realiza un delete de favoritos,
// se utiliza el método save, para guardar el documento con la
// información correspondiente en la base de datos
// se utiliza método pull para eliminar un elemento de la coleción y devolver el elemento extraído
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
playlistService.deletePlaylist = async function ({ id, song }) {
  try {
    const playlist = await Playlist.findById(id);
    playlist.songsList.pull(song);
    playlist.save();
    return playlist;
  } catch (e) {
    // Log Errors
    console.log('Error Message', e.message);
    throw Error('Error while delete playlist');
  }
};
// se crea un delete de todas las playlists
// se utiliza el método find para hacer una búsqueda por id
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
playlistService.deletePlaylistAll = async function ({ id }) {
  try {
    const playlist = await Playlist.findByIdAndRemove(id);
    return playlist;
  } catch (e) {
    console.log('Error Message', e.message);
    throw new Error('Error while delete playlist');
  }
};
// se crea un update del nombre de la playlist
// se utiliza el método findOne, para devolver un solo documento
// se utiliza el método save, para guardar el documento con la
// información correspondiente en la base de datos
// se crea una función asíncrona con su respectiva información en el try y un catch para los errores
playlistService.updateNamePlaylist = async function ({ id }, { name }) {
  try {
    const playlists = await Playlist.findById(id);
    const updateName = await playlists.set({ name });
    await updateName.save();
    return updateName;
  } catch (e) {
    console.log(e.message);
    throw Error('Error while save playist name');
  }
};
// se exporta el objeto con todos los métodos
module.exports = playlistService;
