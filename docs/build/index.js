const fs = require('fs');

module.exports = {
  onPreBuild: () => {
    fs.writeFileSync('./docs/env.js', `export const GOOGLE_API_KEY = '${process.env.GOOGLE_API_KEY}'`);
  },
};
