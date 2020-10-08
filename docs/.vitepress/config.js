const path = require('path')

module.exports = {
  title: 'vue3-google-maps',
  description: 'vue3-google-maps documentation',
  themeConfig: {
    nav: [
      {
        text: 'Guide',
        link: '/guide',
      },
      {
        text: 'API',
        link: '/api',
      },
    ],
    sidebar: [
      {
        text: 'Installation',
        link: '/installation',
      },
      {
        text: 'Getting Started',
        link: '/getting-started',
      },
      {
        text: 'Components',
        children: [
          {
            text: 'Markers',
            link: '/components/markers',
          },
          {
            text: 'Polylines',
            link: '/components/polylines',
          },
          {
            text: 'Polygons',
            link: '/components/polygons',
          },
          {
            text: 'Rectangles',
            link: '/components/rectangles',
          },
          {
            text: 'Circles',
            link: '/components/circles',
          },
          {
            text: 'Custom Controls',
            link: '/components/custom-controls',
          },
        ],
      },
    ],
  },
  alias: {
    '/@/': path.resolve(__dirname, '../../src'),
  },
}
