const express = require('express');
const mongoose = require('mongoose');
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
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('connection to db established'));

app.use(express.json());
app.use(express.urlencoded({
  type: 'aplication/x-www-form-urlencode',
  extended: true,
}));

app.use('/', userRoute);
app.use('/', favoritesRoute);
app.use('/', recentsRoute);
app.use('/', playlistRoute);

app.use('*', (req, res) => {
  res.status(404);
  res.send('Path cannot found');
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running on ${HOSTNAME}:${PORT}`);
}); // nodemon para ver errores en tiempo real
