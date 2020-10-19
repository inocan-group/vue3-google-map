const path = require('path')

module.exports = {
  title: 'vue3-google-maps',
  description: 'vue3-google-maps documentation',
  themeConfig: {
    nav: [],
    sidebar: [
      {
        text: 'Quick Start',
        link: '/',
      },
      {
        text: 'Components',
        children: [
          {
            text: 'Marker',
            link: '/components/marker',
          },
          {
            text: 'Polyline',
            link: '/components/polyline',
          },
          {
            text: 'Polygon',
            link: '/components/polygon',
          },
          {
            text: 'Rectangle',
            link: '/components/rectangle',
          },
          {
            text: 'Circle',
            link: '/components/circle',
          },
          {
            text: 'Custom Control',
            link: '/components/custom-control',
          },
        ],
      },
      {
        text: 'Accessing the Google API',
        link: '/accessing-google-api',
      },
    ],
  },
  alias: {
    '/@/': path.resolve(__dirname, '../../src'),
  },
}
