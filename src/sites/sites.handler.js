const path = require('path');

const handler = {
  getData: (req, res) => {
    res.sendFile(path.join(__dirname, '../../', 'public', 'doc', '15.1 skimountain.jpg'));
  },
};
module.exports = handler;
