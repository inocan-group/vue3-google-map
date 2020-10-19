const path = require('path')

module.exports = {
  root: './dev',
  alias: {
    '/@/': path.resolve(__dirname, 'src'),
  },
}
