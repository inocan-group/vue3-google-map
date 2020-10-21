import theme from 'vitepress/dist/client/theme-default'
import * as libraryComponents from '/@/components/index'
import * as examples from '/docs/examples/index'
import { h } from 'vue'
import { GOOGLE_API_KEY } from '/docs/env'

export default {
  ...theme,
  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance from createApp()
    // router is VitePress' custom router (see `lib/app/router.js`)
    // siteData is a ref of current site-level metadata.

    const { GoogleMap, ...libraryComponentsRest } = libraryComponents

    app.component('GoogleMap', {
      render() {
        return h(GoogleMap, { apiKey: GOOGLE_API_KEY }, this.$slots.default())
      },
    })

    for (const key in libraryComponentsRest) {
      app.component(key, libraryComponents[key])
    }

    for (const key in examples) {
      app.component(key, {
        render() {
          return h(examples[key], { apiKey: GOOGLE_API_KEY })
        },
      })
    }
  },
}
