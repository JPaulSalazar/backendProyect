// se declara la variable requerida de express
const express = require('express');
// se declara la variable requerida de mongoose
const mongoose = require('mongoose');
// se declaran la variables requeridas de cada ruta
const userRoute = require('./routes/user.route');
const favoritesRoute = require('./routes/favorites.route');
const recentsRoute = require('./routes/recents.route');
const playlistRoute = require('./routes/playlist.route');

const app = express();
require('dotenv').config();

const HOSTNAME = process.env.HOSTNAME || 'localhost'; // SI NO PUEDE LEER QUE SE LAS SETEE POR DEFECTO
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
// se utiliza el evento on para imprimir un error si alguna fumcionalidad no se ejecuta
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('connection to db established'));

app.use(express.json());
app.use(express.urlencoded({ // función default de express que analiza las
  // solicitudesde entrada con cargas codificadas en urlencoded se basa en body-parser
  type: 'aplication/x-www-form-urlencode',
  extended: true,
}));
// se llaman a las rutas respectivamente
app.use('/', userRoute);
app.use('/', favoritesRoute);
app.use('/', recentsRoute);
app.use('/', playlistRoute);
// se vincula y escucha las conexiones en el puerto específicado
app.use('*', (req, res) => {
  res.status(404);
  res.send('Path cannot found');
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running on ${HOSTNAME}:${PORT}`);
}); // nodemon para ver errores en tiempo real
