import { fileURLToPath } from "node:url";
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "vue3-google-map",
  description: "vue3-google-map documentation",
  themeConfig: {
    search: {
      provider: 'local'
    },

    sidebar: [
      {
        text: "Getting Started",
        link: "/getting-started/",
      },
      {
        text: "Components",
        link: "/components/",
        collapsed: false,
        items: [
          {
            text: "Marker",
            link: "/components/marker",
          },
          {
            text: "Polyline",
            link: "/components/polyline",
          },
          {
            text: "Polygon",
            link: "/components/polygon",
          },
          {
            text: "Rectangle",
            link: "/components/rectangle",
          },
          {
            text: "Circle",
            link: "/components/circle",
          },
          {
            text: "Info Window",
            link: "/components/info-window",
          },
          {
            text: "Custom Marker",
            link: "/components/custom-marker",
          },
          {
            text: "Custom Control",
            link: "/components/custom-control",
          },
          {
            text: "Marker Cluster",
            link: "/components/marker-cluster",
          },
          {
            text: "Heatmap Layer",
            link: "/components/heatmap-layer",
          },
        ],
      },
      {
        text: "Advanced Usage",
        link: "/advanced-usage/",
      },
    ],

    socialLinks: [
      {
        icon: {
          svg:'<svg role="img" xmlns="http://www.w3.org/2000/svg" width="540" height="210" viewBox="0 0 18 7" style="width: 24px"><path fill="#CB3837" d="M0 0h18v6H9v1H5V6H0V0zm1 5h2V2h1v3h1V1H1v4zm5-4v5h2V5h2V1H6zm2 1h1v2H8V2zm3-1v4h2V2h1v3h1V2h1v3h1V1h-6z"/><path fill="#FFF" d="M1 5h2V2h1v3h1V1H1zM6 1v5h2V5h2V1H6zm3 3H8V2h1v2zM11 1v4h2V2h1v3h1V2h1v3h1V1z"/></svg>',
        },
        link: 'https://www.npmjs.com/package/vue3-google-map',
        ariaLabel: 'npm',
      },
      { icon: 'github', link: 'https://github.com/inocan-group/vue3-google-map' },
    ]
  },

  vite: {
    ssr: {
      noExternal: [
        '@googlemaps/js-api-loader',
        '@googlemaps/markerclusterer',
      ]
    },
    resolve: {
      alias: {
        "@lib": fileURLToPath(new URL("../../src/index.ts", import.meta.url)),
        "@docs": fileURLToPath(new URL("..", import.meta.url)),
      },
    }
  }
});
