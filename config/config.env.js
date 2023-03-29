require('dotenv').config();

const getConfig = (config) => {
  try {
    return process.env[config];
  } catch (error) {
    return '';
  }
};

module.exports = { getConfig };
