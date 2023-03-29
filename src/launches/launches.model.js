/* eslint-disable no-param-reassign */
require('module-alias/register');
// const launches =require('./launches.mongo')
const { launch } = require('@storage/storage.js');
const db = require('./launches.mongo');

const launches = new Map();

launch.flightNumber = 100;
launch.launchDate = new Date('2030-12-12');
launch.mission = 'Kepler Exploration X';
launch.rocket = 'Explorer IS1';
launch.upcoming = true;
launch.success = true;
launch.customers = ['ZTM', 'NASA'];
launch.target = 'Kepler-442 b';

// let latestFlightNumber = 100;
launches.set(launch.flightNumber, launch);
function getAllLaunches() {
  return db.find({});
}
async function getMaxLaunches() {
  try {
    const maxNumber = await db.findOne({}, { _id: 0, flightNumber: 1 }).sort({ flightNumber: -1 })
      .limit(1);
    // console.log(maxNumber,'tes')
    return !maxNumber ? launch.flightNumber : maxNumber.flightNumber + 1;
  } catch (error) {
    return console.log(error.message);
  }
}
async function saveMission(mission) {
  try {
    return db.create(mission);
  } catch (error) {
    return console.error(error);
  }
}

async function addDataLaunch(item) {
  try {
    // TODO : add mission
    const latestFlightNumber = await getMaxLaunches();
    // console.log(latestFlightNumber);
    item.customers = item.customers.split(',');
    item.flightNumber = Number(latestFlightNumber);
    await saveMission(item);
    return { ok: true };
  } catch (error) {
    console.log(error.message);
    return { ok: false };
  }
}

function existLaunchById(id) {
  return db.findOne({ flightNumber: id }, { _id: 0, __v: 0 });
}

async function abortLaunchById(id) {
  const aborted = await db.updateOne({ flightNumber: id }, { upcoming: false, success: false });
  return aborted;
}
async function successLaunchById(id) {
  const succeed = await db.updateOne({ flightNumber: id }, { upcoming: false, success: true });
  return succeed;
}

module.exports = {
  getAllLaunches, addDataLaunch, existLaunchById, abortLaunchById, successLaunchById,
};
