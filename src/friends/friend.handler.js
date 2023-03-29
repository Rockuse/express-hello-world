require('module-alias/register');
const { nanoid } = require('nanoid');
const { friends } = require('@storage/storage');

module.exports = {
  getAll: (req, res) => {
    res.json(friends);
  },

  addOne: (req, res) => {
    const id = nanoid(16);
    res.json({
      id,
      success: 'success',
    });
  },
};
