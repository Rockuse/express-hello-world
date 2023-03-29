require('module-alias/register');
const parse = require('csv-parser');
const fs = require('fs');
const { resolve } = require('path');
// const { habitablePlanets } = require('@storage/storage');
const planets = require('./planet.mongo');
// const habitablePlanets =require('./planet.mongo')
function isHabitable(planet) {
  return planet.koi_disposition === 'CONFIRMED' && planet.koi_insol > 0.36 && planet.koi_insol < 1.11
  && planet.koi_prad < 1.6;
}
async function getAllPlanets() {
  return planets.find({});
}

async function savePlanet(planet) {
  try {
    return await planets.updateOne(
      { kepler_name: planet.kepler_name },
      { kepler_name: planet.kepler_name },
      { upsert: true },
    );
  } catch (error) {
    return console.log(`Could not save planet ${error}`);
  }
}

function loadPlanetData() {
  try {
    return new Promise((solved, reject) => {
      fs.createReadStream(resolve(__dirname, '../../public/doc/kepler_data.csv'))
        .pipe(parse({
          comment: '#',
        })).on('data', async (data) => {
        // TODO: Insert+update=Upsert
          if (isHabitable(data) === true) {
            savePlanet(data);
          }
        }).on('error', (err) => {
          console.log(err);
          reject(err);
        })
        .on('end', async () => {
          const planetCount = (await getAllPlanets()).length;
          console.log(`${planetCount} habitable planets found!`);
          solved();
        });
    });
  } catch (error) {
    return console.error(error);
  }
}

module.exports = { loadPlanetData, getAllPlanets };
