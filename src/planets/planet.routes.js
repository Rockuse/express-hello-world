const handler = require('./planet.handler');

module.exports = (router) => {
  router.get('/', handler.getAll);
  return router;
};
