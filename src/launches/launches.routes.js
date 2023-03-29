const handler = require('./launches.handler');

module.exports = (router) => {
  router.get('/', handler.getLaunch);
  router.post('/', handler.addLaunch);
  router.delete('/:id', handler.deleteLaunch);
  router.put('/:id', handler.successLaunch);
  return router;
};
