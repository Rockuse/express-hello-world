// const { habitablePlanets } = require('@storage/storage');
const { getAllPlanets } = require('./planet.models');

const planets = {
  getAll: async (req, res) => res.status(200).json(await getAllPlanets()),
};
module.exports = planets;
