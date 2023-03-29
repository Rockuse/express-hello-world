require('module-alias/register');
const { resolve } = require('path');
const v1 =require('./v1')

module.exports = (app, server) => {
  app.use('/v1',v1(server.Router(),server))
  app.get('/*', (req, res) => {
    res.sendFile(resolve(__dirname, '../../build/index.html'));
  });

  return app;
};
