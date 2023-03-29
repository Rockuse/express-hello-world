require('module-alias/register');
const mongoose = require('mongoose');
const http = require('http');
const { loadPlanetData } = require('@src/planets/planet.models');
const app = require('@src/app');
const { getConfig } = require('./config/config.env');

const URL = process.env.NODE_ENV !== 'production' ? 'localhost' : getConfig('URL');
const PORT = getConfig('PORT') || 8000;
const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB Connection is ready');
});
mongoose.connection.on('error', (err) => {
  console.error(err);
});
async function start() {
  await mongoose.connect(getConfig('MONGODB_URL'));
  await loadPlanetData();
  server.listen(PORT, () => {
    console.log(`connected to ${URL}:${PORT}`);
  });
}
start();
