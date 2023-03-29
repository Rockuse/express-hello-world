const handler = require('./sites.handler');

module.exports = (router) => {
  router.get('/', handler.getData);
  return router;
};
