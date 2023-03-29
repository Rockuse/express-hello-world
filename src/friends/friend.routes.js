const handler = require('./friend.handler');

module.exports = (router) => {
  router.get('/', handler.getAll);
  return router;
};
// router;
