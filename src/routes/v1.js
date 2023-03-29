require('module-alias/register');
const planets = require('../planets/planet.routes');
const site = require('../sites/sites.routes');
const friends = require('../friends/friend.routes');
const launches = require('../launches/launches.routes');

module.exports = (app, server) => {
    app.use('/sites', site(server.Router()));
    app.use('/friends', friends(server.Router()));
    app.use('/planets', planets(server.Router()));
    app.use('/launches', launches(server.Router()));
    return app;
  };
  