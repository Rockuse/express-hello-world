/* eslint-disable no-restricted-globals */
const model = require('./launches.model');

module.exports = {
  getLaunch: async (req, res) => {
    res.json(await model.getAllLaunches());
  },

  addLaunch: async (req, res) => {
    const launch = req.body;
    launch.launchDate = new Date(launch.launchDate);
    if (!launch.launchDate || !launch.mission || !launch.rocket || !launch.target
      || !launch.customers) {
      return res.status(400).json({ error: 'Missing required launch property', ok: false });
    }
    if (isNaN(launch.launchDate)) {
      return res.status(400).json({ error: 'Invalid launch date', ok: false });
    }
    if (await (await model.addDataLaunch(launch)).ok) { // Add data
      return res.status(201).json(launch);
    }
    return res.status(400).json({ message: 'gagal terupdate' });
  },

  deleteLaunch: async (req, res) => {
    const id = Number(req.params.id);
    if (!await model.existLaunchById(id)) return res.status(404).json({ error: 'Launch is not found' });
    model.abortLaunchById(id);
    return res.status(201).json({ ok: true });
  },

  successLaunch: async (req, res) => {
    const id = Number(req.params.id);
    if (!model.existLaunchById(id)) return res.status(404).json({ error: 'Launch is not found' });
    model.successLaunchById(id);
    return res.status(201).json({ ok: true });
  },
};
